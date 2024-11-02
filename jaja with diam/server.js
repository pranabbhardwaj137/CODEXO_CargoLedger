const express = require('express');
const cors = require('cors');
const { Keypair, TransactionBuilder, Operation, Networks } = require('diamante-base');
const { Horizon } = require('diamante-sdk-js');
const path = require('path');

// Create express app
const app = express();

// Global error handler for uncaught exceptions
process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error);
    // Don't exit the process
});

// Global error handler for unhandled promise rejections
process.on('unhandledRejection', (error) => {
    console.error('Unhandled Rejection:', error);
    // Don't exit the process
});

// CORS configuration
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type'],
}));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware to validate Diamante secret key format
const validateSecretKey = (req, res, next) => {
    const { senderSecret } = req.body;
    try {
        // Try to create a keypair from the secret - this will throw if invalid
        Keypair.fromSecret(senderSecret);
        next();
    } catch (error) {
        console.error('Invalid secret key format:', error.message);
        res.status(400).json({
            error: 'Invalid secret key format',
            details: error.message
        });
    }
};

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Serve static files
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'shipment.html'));
});

// Store text endpoint with validation middleware
app.post('/store-text', validateSecretKey, async (req, res) => {
    try {
        console.log('Processing store-text request...');
        const { senderSecret, key, text } = req.body;

        // Input validation
        if (!key || !text) {
            return res.status(400).json({
                error: 'Missing required fields',
                details: { hasKey: !!key, hasText: !!text }
            });
        }

        // Initialize Horizon server
        console.log('Connecting to Diamante testnet...');
        const server = new Horizon.Server('https://diamtestnet.diamcircle.io/');
        
        // Create keypair
        console.log('Creating keypair...');
        const senderKeypair = Keypair.fromSecret(senderSecret);
        const senderPublicKey = senderKeypair.publicKey();
        console.log('Public Key:', senderPublicKey);

        // Load account with retry logic
        let account;
        try {
            console.log('Loading account...');
            account = await server.loadAccount(senderPublicKey);
            console.log('Account loaded successfully');
        } catch (accountError) {
            console.error('Error loading account:', accountError);
            return res.status(400).json({
                error: 'Failed to load account',
                details: accountError.message
            });
        }

        // Create transaction
        console.log('Building transaction...');
        const transaction = new TransactionBuilder(account, {
            fee: await server.fetchBaseFee(),
            networkPassphrase: Networks.TESTNET
        })
        .addOperation(Operation.manageData({
            name: key,
            value: text
        }))
        .setTimeout(30)
        .build();

        // Sign transaction
        console.log('Signing transaction...');
        transaction.sign(senderKeypair);

        // Submit transaction with retry logic
        let attempt = 0;
        const maxAttempts = 3;
        
        while (attempt < maxAttempts) {
            try {
                console.log(`Submitting transaction (attempt ${attempt + 1})...`);
                const result = await server.submitTransaction(transaction);
                console.log('Transaction successful:', result.hash);
                
                return res.json({
                    message: `Text data stored successfully with key: ${key}`,
                    transactionHash: result.hash
                });
            } catch (submitError) {
                attempt++;
                console.error(`Transaction attempt ${attempt} failed:`, submitError);
                
                if (attempt === maxAttempts) {
                    return res.status(500).json({
                        error: 'Failed to submit transaction',
                        details: submitError.message
                    });
                }
                
                // Wait before retrying
                await new Promise(resolve => setTimeout(resolve, 1000));
            }
        }
    } catch (error) {
        console.error('Store text error:', error);
        res.status(500).json({
            error: 'Internal server error',
            details: error.message
        });
    }
});

// Get stored text endpoint
app.get('/get-stored-text', async (req, res) => {
    try {
        const { publicKey, key } = req.query;

        if (!publicKey || !key) {
            return res.status(400).json({
                error: 'Missing required parameters',
                details: { hasPublicKey: !!publicKey, hasKey: !!key }
            });
        }

        const server = new Horizon.Server('https://diamtestnet.diamcircle.io/');
        
        console.log('Loading account for retrieval...');
        const account = await server.loadAccount(publicKey);
        
        const dataEntry = account.data_attr[key];
        
        if (dataEntry) {
            const decodedData = Buffer.from(dataEntry, 'base64').toString('utf8');
            res.json({ data: decodedData });
        } else {
            res.json({ data: null });
        }
    } catch (error) {
        console.error('Get stored text error:', error);
        res.status(500).json({
            error: 'Failed to retrieve data',
            details: error.message
        });
    }
});

// Start server
const PORT = process.env.PORT || 3001;
const server = app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
    console.log('Server is ready to accept connections');
});

// Handle server errors
server.on('error', (error) => {
    console.error('Server error:', error);
});