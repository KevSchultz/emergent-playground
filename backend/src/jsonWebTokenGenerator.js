/**
 * @project Emergent Playground
 * @file jsonWebTokenGenerator
 * @overview This file exports a function that generates a JSON Web Token (JWT) for a provided userid. The JWT is signed 
 * using a secret key stored in environment variables and is set to expire in 1 hour. 
 * @authors Kevin Schultz
 * @exports jsonWebTokenGenerator
 */

const jsonWebToken = require('jsonwebtoken');
require('dotenv').config();

/**
 * @description Generates a JSON Web Token (JWT) for the provided user ID.
 * 
 * @function
 * @param {string} userid - The ID of the user for whom the JWT is to be generated.
 * @returns {string} - Returns a JWT that expires in 1 hour.
 * @throws Will throw an error if the JWT signing process fails.
 */
function jsonWebTokenGenerator(userid) {

    const payload = {
        userid: userid
    }

    return jsonWebToken.sign(payload, process.env.JSON_WEB_TOKEN_SECRET_KEY, {
        expiresIn: '1h',
        algorithm: 'HS256',
    });
}

module.exports = jsonWebTokenGenerator;