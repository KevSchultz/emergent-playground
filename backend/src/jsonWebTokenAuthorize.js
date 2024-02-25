const jsonWebToken = require('jsonwebtoken');
require('dotenv').config();


function jsonWebTokenAuthorize (accessToken, request) {

    if (!accessToken) {
        return false;
    }

    try {
        const user = jsonWebToken.verify(accessToken, process.env.JSON_WEB_TOKEN_SECRET_KEY);
        request.user = user;
        return true;
    } catch (error) {
        return false;
    }
};

module.exports = jsonWebTokenAuthorize;