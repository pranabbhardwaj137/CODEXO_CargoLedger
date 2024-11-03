
# Text Fetcher with Ledger on Diamante
This Text Fetcher with Ledger project provides a decentralized application for securely storing and retrieving text data using the Diamante blockchain. By integrating with Diamante’s ledger system, this application ensures data security and immutability, ideal for applications requiring reliable text storage and verification.

## Overview
The Text Fetcher with Ledger project leverages the Diamante blockchain to securely store and retrieve arbitrary text data. It is particularly useful for applications where data immutability, accessibility, and security are crucial.

## Prerequisites
Node.js (v14 or higher recommended)
Diamante Blockchain testnet account with a valid secret key
Dependencies (installed through npm)

## Features
Decentralized Storage: Ensures secure and immutable text storage.
Error Handling: Comprehensive error-handling mechanisms to improve stability.

## Prerequisites
Node.js (v14 or higher recommended)

Diamante Blockchain testnet account with a valid secret key

Dependencies (installed through npm)

## Installation
#### Clone the Repository:

bash

    git clone https://github.com/yourusername/text-fetcher-ledger-diamante.git

    cd text-fetcher-ledger-diamante

#### Install Dependencies:

bash

    npm install
*Set up Diamante Testnet: Obtain a Diamante testnet account with a valid secret key to interact with the blockchain.*

### Running the Application
To start the application server:

bash

    node index.js

The server will be accessible at http://localhost:3001 by default, or you can specify a different port via the PORT environment variable.

## Project Structure
**index.js**: Main server file defining routes and initializing the Express app.

**managedata.js**: JavaScript file for handling frontend logic.

**shipment.html**: Frontend HTML page to interact with the API for storing and retrieving text data.

**server.js**: Contains server configuration.

