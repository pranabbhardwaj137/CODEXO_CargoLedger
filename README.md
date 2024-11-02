# Cargo Verification on Diamante Blockchain by CODEXO


This project enables secure and immutable cargo verification using the Diamante blockchain. By utilizing a decentralized ledger, it ensures traceable, tamper-proof cargo records.

### Project Overview
Cargo Verification: A system that verifies and logs cargo details on Diamante's blockchain for enhanced transparency and security.

Security and Immutability: Data logged on the blockchain cannot be altered, ensuring data integrity.

### Repository Structure

index.js: Handles the main logic for interfacing with the Diamante blockchain.

server.js: Sets up the backend server to serve the application and manage API routes.

## Getting Started
### Prerequisites

Node.js: Download Node.js and install it on your machine.
Diamante Blockchain Access: You’ll need access to the Diamante blockchain and, if required, relevant API credentials.
### Installation
#### Clone the Repository:

bash

    git clone https://github.com/pranabbhardwaj137/CODEXO_blockchain.git


bash

    cd CODEXO_blockchain


### Install Dependencies:


npm install


### Running the Application
#### Start the Application:

Run index.js to initialize the blockchain logic:

bash

    node index.js

Run server.js to start the backend server:

bash

    node server.js

#### Access the Application:

Open your browser and navigate to http://localhost:3000 to view the cargo verification dashboard.


### Using the Portal

Login: The portal will prompt for your Account ID and Password. This verifies your identity for accessing the Diamante blockchain.

#### Enter Ledger Information:

Ledger ID: Enter the ID of the ledger you wish to access.

Secret Key: Input your unique secret key for secure access.

Public Key: Provide your public key for verification purposes.

Verification Status: Enter the cargo verification status to be displayed on the ledger (e.g., "Verified," "Pending").

Submit and Verify: Once all details are entered, submit the form. The system will record the verification status on the Diamante blockchain, ensuring data integrity and transparency.

## Use case
Logistics Company: The primary user who logs cargo data into the blockchain for verification.

Regulatory Authorities: May view cargo status to verify compliance with shipping regulations.

Clients/Partners: Can access cargo records to confirm that the cargo has been verified and approved.
