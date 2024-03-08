const jsonWebToken = require('jsonwebtoken');
require('dotenv').config();

/**
 * @description Verifies the provided JSON Web Token (JWT) and assigns the decoded userid to the request object.
 * 
 * @function
 * @param {string} accessToken - The JWT to verify.
 * @param {Object} request - The request object where the decoded user ID will be assigned.
 * @returns {boolean} - Returns true if the JWT is successfully verified and the user ID is assigned, false otherwise.
 */
function jsonWebTokenAuthorize (accessToken, request) {

    if (!accessToken) {
        return false;
    }

    try {
        
        const decoded = jsonWebToken.verify(accessToken, process.env.JSON_WEB_TOKEN_SECRET_KEY);
        request.userid = decoded.userid;
        return true;

    } catch (error) {
        return false;
    }
};

module.exports = jsonWebTokenAuthorize;