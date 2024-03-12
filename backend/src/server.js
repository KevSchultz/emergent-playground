/**
 * @project Emergent Playground
 * @file server.js
 * @overview This file sets up an HTTPS server for the Emergent Playground project. It imports necessary modules, 
 * loads environment variables, and imports the main application. It then creates an HTTPS server using SSL key and 
 * certificate files specified in the environment variables, and starts the server on the port specified in the 
 * environment variables. 
 * @authors Kevin Schultz
 */

const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const application = require('./application');

const httpsServer = https.createServer({
    key: fs.readFileSync(path.join(process.env.SSL_KEY_PATH)),
    cert: fs.readFileSync(path.join(process.env.SSL_CERTIFICATE_PATH))
}, application);

httpsServer.listen(process.env.SSL_PORT, () => {
    console.log(`HTTPS server running on port ${process.env.SSL_PORT}`);
});

// Redirect HTTP requests to HTTPS
const httpServer = http.createServer((request, response) => {
    if (request.url === '/.well-known/acme-challenge/njcAnN02vwQaYjBNyF5MOl_enOGL0Xy4FRE0Sm1TkO0') {
        fs.readFile('/home/main/emergent-playground/backend/src/acme-challenge/njcAnN02vwQaYjBNyF5MOl_enOGL0Xy4FRE0Sm1TkO0', 'utf8', (err, data) => {
            if (err) {
                response.writeHead(404);
                response.end('Not found');
            } else {
                response.writeHead(200, { 'Content-Type': 'text/plain' });
                response.end(data);
            }
        });
    } else {
        response.writeHead(301, { "Location": "https://" + request.headers['host'] + request.url });
        response.end();
    }
});

const httpPort = process.env.HTTP_PORT || 80;

httpServer.listen(httpPort, () => {
    console.log(`HTTP server running on port ${httpPort}`);
});