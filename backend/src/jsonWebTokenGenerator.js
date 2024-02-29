const jsonWebToken = require('jsonwebtoken');
require('dotenv').config();

function jsonWebTokenGenerator(userid) {

    const payload = {
        user: {
            id: userid
        }
    }

    return jsonWebToken.sign(payload, process.env.JSON_WEB_TOKEN_SECRET_KEY, {
        expiresIn: '1h',
        algorithm: 'HS256',
    });
}

module.exports = jsonWebTokenGenerator;