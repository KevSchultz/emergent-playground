/**
 * @project Emergent Playground
 * @file authentication.js
 * @overview This file handles user authentication middleware and routes. It exports functions for 
 * registering a new user and logging in an existing user. The register function creates a new user account in the 
 * PostgreSQL database, hashes the user's password using bcrypt, and sets a JSON Web Token (JWT) as an HttpOnly cookie. 
 * @authors Kevin Schultz
 * @exports register
 * @exports login
 * @exports check
 */

const { postgreSQLConnection } = require('./postgreSQLConnect');

const jsonWebTokenGenerator = require('./jsonWebTokenGenerator');
const jsonWebTokenAuthorize = require('./jsonWebTokenAuthorize');

const bcrypt = require('bcrypt');

const COOKIE_EXPIRATION_TIME = 3600000;

/**
 * @description Registers a new user by creating an account in the database and setting a JWT as an HttpOnly cookie.
 *
 * @param {Object} request - The Express request object.
 * @param {Object} request.body - The request body.
 * @param {string} request.body.username - The username of the new user.
 * @param {string} request.body.email - The email of the new user.
 * @param {string} request.body.password - The password of the new user.
 * @param {Object} response - The Express response object.
 * @returns {void}
 */
exports.register = async (request, response) => {

    if (!request.body.username || !request.body.email || !request.body.password) {
        response.sendStatus(400);
        return;
    }

    const { username, email, password } = request.body;

    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hashSync(password, salt);

        const user = await postgreSQLConnection.createAccount(username, email, hashedPassword);

        const jsonWebToken = jsonWebTokenGenerator(user.userid);

        // Set the JWT as an HttpOnly cookie
        response.cookie('accessToken', jsonWebToken, {
            httpOnly: true, // The cookie is not accessible via JavaScript
            secure: true, // The cookie will be sent only over HTTPS
            sameSite: 'strict', // The cookie will not be sent with cross-site requests
            expires: new Date(Date.now() + COOKIE_EXPIRATION_TIME), // 1 hour
        });

        response.status(200).json({ username: user.username });
    } catch (err) {
        console.log(err);
        response.sendStatus(401);
    }
};

/**
 * @description Logs in a user by verifying their credentials and setting a JWT as an HttpOnly cookie.
 *
 * @param {Object} request - The Express request object.
 * @param {Object} request.body - The request body.
 * @param {string} request.body.email - The email of the user.
 * @param {string} request.body.password - The password of the user.
 * @param {Object} response - The Express response object.
 * @returns {void}
 */
exports.login = async (request, response) => {

    if (!request.body.email || !request.body.password) {
        response.sendStatus(400);
        return;
    }

    const { email, password } = request.body;

    try {
        const user = await postgreSQLConnection.getAccount(email);

        const hashedPassword = user.password;

        const isValidPassword = await bcrypt.compare(password, hashedPassword);

        if (isValidPassword) {
            const jsonWebToken = jsonWebTokenGenerator(user.userid);

            // Set the JWT as an HttpOnly cookie
            response.cookie('accessToken', jsonWebToken, {
                httpOnly: true, // The cookie is not accessible via JavaScript
                secure: true, // The cookie will be sent only over HTTPS
                sameSite: 'strict', // The cookie will not be sent with cross-site requests
                expires: new Date(Date.now() + COOKIE_EXPIRATION_TIME), // 1 hour
            });

            response.status(200).json({ username: user.username });
        } else {
            throw new Error('Invalid.');
        }
    } catch (err) {
        response.sendStatus(401);
    }
};

/**
 * @description Middleware to check if the user is authenticated by verifying the JWT in the HttpOnly cookie.
 *
 * @param {Object} request - The Express request object.
 * @param {Object} request.cookies - The cookies in the request.
 * @param {string} request.cookies.accessToken - The JWT for authentication.
 * @param {Object} response - The Express response object.
 * @param {Function} next - The next middleware function.
 * @returns {void}
 */
exports.check = (request, response, next) => {

    if (request.cookies === undefined || request.cookies.accessToken === undefined) {
        response.sendStatus(401);
        return;
    }

    try {
        const accessToken = request.cookies.accessToken;

        if (!accessToken) {
            response.sendStatus(401);
            return;
        }

        const isValid = jsonWebTokenAuthorize(accessToken, request);

        if (isValid) {
            next();
        } else {
            response.sendStatus(403);
        }
    } catch (err) {
        response.sendStatus(401);
    }
};

/**
 * @description Logs out the user by clearing the 'accessToken' cookie.
 *
 * @function
 * @param {object} request - Express request object.
 * @param {object} response - Express response object.
 * @returns {void}
 */
exports.logout = (request, response) => {
    response.clearCookie('accessToken');
    response.sendStatus(200);
};