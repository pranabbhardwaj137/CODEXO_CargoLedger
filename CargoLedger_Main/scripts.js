async function storeText() {
    const senderSecret = document.getElementById('senderSecret').value;
    const senderPublic = document.getElementById('senderPublic').value;
    const key = document.getElementById('key').value;
    const text = document.getElementById('text').value;

    try {
        const response = await fetch('http://localhost:3001/store-text', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ senderSecret, senderPublic, key, text })
        });
        const result = await response.json();
        document.getElementById('storeResult').textContent = result.message || "Text data stored successfully!";
    } catch (error) {
        document.getElementById('storeResult').textContent = "Error storing text data: " + error.message;
    }
}

async function fetchLedgerById() {
    const ledgerId = document.getElementById('ledgerId').value;

    try {
        const response = await fetch('http://localhost:3001/ledger');
        const ledger = await response.json();
        const filteredEntries = ledger.filter(entry => entry.key === ledgerId);
        const ledgerTableBody = document.getElementById('ledgerTableBody');
        ledgerTableBody.innerHTML = ''; // Clear previous display

        if (filteredEntries.length === 0) {
            ledgerTableBody.innerHTML = '<tr><td colspan="4" class="border p-2 text-center text-gray-400">No entries found for this ledger ID.</td></tr>';
            return;
        }

        filteredEntries.forEach(entry => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td class="border p-2">${entry.senderPublic}</td>
                <td class="border p-2">${entry.key}</td>
                <td class="border p-2">${entry.text}</td>
                <td class="border p-2">${new Date(entry.timestamp).toLocaleString()}</td>
            `;
            ledgerTableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Error fetching ledger:', error);
        document.getElementById('ledgerDisplay').textContent = 'Error fetching ledger: ' + error.message;
    }
}
