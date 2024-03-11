/**
 * @project Emergent Playground
 * @file server.js
 * @overview This file sets up an HTTPS server for the Emergent Playground project. It imports necessary modules, 
 * loads environment variables, and imports the main application. It then creates an HTTPS server using SSL key and 
 * certificate files specified in the environment variables, and starts the server on the port specified in the 
 * environment variables. 
 * @authors Kevin Schultz
 */

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
