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
