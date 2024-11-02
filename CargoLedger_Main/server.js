const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const ledger = []; // Array to hold the ledger entries

// Middleware to validate keys
const validateKeys = {
    isValidPublicKey: (publicKey) => {
        // Simple validation for public key format
        return typeof publicKey === 'string' && publicKey.length > 0;
    },
    isValidSecretKey: (secretKey) => {
        // Simple validation for secret key format
        return typeof secretKey === 'string' && secretKey.length > 0;
    }
};

app.post('/store-text', (req, res) => {
    const { senderSecret, senderPublic, key, text } = req.body;

    // Validate input
    if (!senderSecret || !senderPublic || !key || !text) {
        return res.status(400).json({ error: 'Missing required fields: senderSecret, senderPublic, key, and text are required.' });
    }

    // Validate keys
    if (!validateKeys.isValidPublicKey(senderPublic)) {
        return res.status(400).json({ error: 'Invalid public key format.' });
    }
    if (!validateKeys.isValidSecretKey(senderSecret)) {
        return res.status(400).json({ error: 'Invalid secret key format.' });
    }

    // Store the entry in the ledger
    const entry = { senderPublic, key, text, timestamp: new Date() };
    ledger.push(entry);

    res.json({ message: 'Text data stored successfully!', entry });
    console.log(`Stored entry:`, entry);
});

// Endpoint to get the whole ledger
app.get('/ledger', (req, res) => {
    res.json(ledger);
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

