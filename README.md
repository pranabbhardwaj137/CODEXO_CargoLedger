# CargoLedger: Blockchain Ledger for Transparent Logistics
The CODEXO CargoLedger project aims to build a cargo verification system that leverages the Diamante Ledger Network for secure data storage and retrieval. This repository includes two primary components: CargoLedger_Main and Text Fetcher with Ledger with Diamante. These components provide separate functionality for data storage, retrieval, and secure user login, with future plans for integration into a comprehensive system.

## Repository Structure
**CargoLedger_Main**
This folder implements the use of the Diamante Ledger Network to store data, specifically the verification status of cargo, in text form. It serves as the primary storage solution for the cargo verification system, ensuring that verification statuses are securely saved on the blockchain for transparency and immutability.

**Text Fetcher with Ledger with Diamante**
This folder focuses on a secure login system using Diamante-generated private and public keys. Users log in to the Cargo Verification system using their unique keys, ensuring only authorized access to verification data. This component also allows fetching of the stored data for verification purposes.

**Integration Status**
The integration of both CargoLedger_Main and Text Fetcher with Ledger with Diamante is currently in progress. Once complete, the system will enable seamless user authentication and verification data storage and retrieval through the Diamante Ledger Network. Additional time is required to finalize this integration for a fully cohesive solution.

## Usage
### Prerequisites
Node.js installed

Express.js installed using the command

bash
    npm install express

Diamante Ledger account and access to the Diamante SDK

### Setup
#### Clone the repository:

bash

    git clone https://github.com/pranabbhardwaj137/CODEXO_CargoLedger.git
    cd CODEXO_CargoLedger
    
*Navigate to the desired folder (CargoLedger_Main or Text Fetcher with Ledger with Diamante) to set up each component independently.*


This component is designed to store cargo verification status on the Diamante Ledger.

To start the server, run:
bash

    node index.js

**Text Fetcher with Ledger with Diamante**

This component allows users to log in using Diamante keys and retrieve verification status.
To start the server, run:
bash

    node server.js

Note: Both components currently work independently. Complete system functionality will be achieved upon integration.

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


## Future Development
With further development, the integration of these two components will offer a complete Cargo Verification system, combining secure login and data storage functionalities under one unified interface.

## Contributing
Contributions to this project are welcome. Feel free to fork the repository and submit pull requests with improvements or features.
