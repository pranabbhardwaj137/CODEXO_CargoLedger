document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("storeTextButton").addEventListener("click", storeText);
    document.getElementById("retrieveTextButton").addEventListener("click", retrieveText);
    
    // Test server connection on page load
    checkServerConnection();
});

async function checkServerConnection() {
    try {
        const response = await fetch('http://localhost:3001/health');
        if (!response.ok) {
            throw new Error(`Server health check failed: ${response.status}`);
        }
        console.log('Server connection successful');
    } catch (error) {
        console.error('Server connection failed:', error);
        document.getElementById('storeResult').textContent = 
            'Warning: Cannot connect to server. Please check if the server is running.';
    }
}

async function storeText() {
    const resultElement = document.getElementById('storeResult');
    resultElement.textContent = 'Processing...';
    
    const senderSecret = document.getElementById('senderSecret').value;
    const key = document.getElementById('key').value;
    const text = document.getElementById('text').value;
    
    // Validate input
    if (!senderSecret || !key || !text) {
        resultElement.textContent = 'Error: All fields are required';
        return;
    }
    
    try {
        console.log('Sending store request...');  // Debug log
        
        const response = await fetch('http://localhost:3001/store-text', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ senderSecret, key, text })
        });

        console.log('Response received:', response.status);  // Debug log
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        resultElement.textContent = result.message;
        console.log('Store operation successful:', result);  // Debug log
    } catch (error) {
        console.error('Detailed client error:', error);
        resultElement.textContent = `Error storing text data: ${error.message}`;
    }
}

async function retrieveText() {
    const resultElement = document.getElementById('retrieveResult');
    resultElement.textContent = 'Processing...';
    
    const publicKey = document.getElementById('publicKey').value;
    const key = document.getElementById('retrieveKey').value;
    
    // Validate input
    if (!publicKey || !key) {
        resultElement.textContent = 'Error: Both Public Key and Key are required';
        return;
    }
    
    try {
        console.log('Sending retrieve request...');  // Debug log
        
        const response = await fetch(`http://localhost:3001/get-stored-text?publicKey=${encodeURIComponent(publicKey)}&key=${encodeURIComponent(key)}`, {
            headers: {
                'Accept': 'application/json'
            }
        });

        console.log('Response received:', response.status);  // Debug log
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        resultElement.textContent = result.data ? 
            `Retrieved data: ${result.data}` : 
            "No data found for this key.";
        console.log('Retrieve operation successful:', result);  // Debug log
    } catch (error) {
        console.error('Detailed client error:', error);
        resultElement.textContent = `Error retrieving text data: ${error.message}`;
    }
}
