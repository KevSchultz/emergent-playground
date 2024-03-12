/**
 * @project Emergent Playground
 * @file postgreSQLConnect.js
 * @overview The postgreSQLConnect.js file defines a PostgreSQLConnect class for establishing a connection to a PostgreSQL database. 
 * It uses the pg module to create a client and connect to the database. 
 * The class constructor takes host, user, port, password, and database as parameters. 
 * An error is thrown if the connection fails.
 * @authors Ethan Foster, Kevin Schultz
 * @exports postgreSQLConnect
 */

const { Client } = require('pg'); // declares that the client data type requires pg
require('dotenv').config();

class PostgreSQLConnect {
    /**
     * This class provides a connection to a PostgreSQL database and implements methods for interacting with the database.
     *
     * @class
     *
     * @property {Client} client - The PostgreSQL client.
     *
     * @constructor
     * @param {string} host - The host of the PostgreSQL server.
     * @param {string} user - The username to connect to the PostgreSQL server.
     * @param {number} port - The port of the PostgreSQL server.
     * @param {string} password - The password to connect to the PostgreSQL server.
     * @param {string} database - The name of the database to connect to.
     *
     * @throws Will throw an error if the connection to the database fails.
     */
    constructor(host, user, port, password, database) {
        this.client = new Client({
            host: host,
            user: user,
            port: port,
            password: password,
            database: database,
        });

        // Attempt to connect to the database
        this.client.connect((err) => {
            if (err) {
                throw new Error('Error connecting to the database:', err.stack);
            } else {
                console.log('Connected to the database.');
            }
        });
    }

    /**
     * @description Gets the current date and time and formats it as a timestamp string.
     *
     * The format of the timestamp string is "YYYY-MM-DD HH:mm:ss.SSS", where:
     * - "YYYY" is the four-digit year.
     * - "MM" is the two-digit month (01 = January, 12 = December).
     * - "DD" is the two-digit day of the month.
     * - "HH" is the two-digit hour of the day in 24-hour format.
     * - "mm" is the two-digit minute of the hour.
     * - "ss" is the two-digit second of the minute.
     * - "SSS" is the three-digit millisecond of the second.
     *
     * @returns {string} The formatted timestamp string.
     */
    getCurrentTimeStamp() {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0'); // Month is zero-based, so add 1
        const day = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        const milliseconds = String(now.getMilliseconds()).padStart(3, '0');

        const formattedTimestamp = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds}`;
        return formattedTimestamp;
    }

    /**
     * @description Creates a user account as a schema via a query
     *
     * This function checks if the provided username is already in use. If it is, the function returns an error code.
     * If the username is not in use, the function generates a unique user ID and creates a new user account with the provided username, password, and email.
     * The function then inserts the new user account into the database.
     *
     * @async
     * @method
     * @param {Client} client - The PostgreSQL client.
     * @param {string} username - The username for the new account.
     * @param {string} email - The email for the new account.
     * @param {string} password - The password for the new account.
     * @returns {Promise<Object>} The created user object
     * @throws {Error} If there is an error while querying the database.
     */
    async createAccount(username, email, password) {
        try {
            // check if there is already an account with that username
            const resultUserName = await this.client.query(
                'SELECT * FROM users WHERE username = $1',
                [username]
            );

            const countUserName = parseInt(resultUserName.rows.length); // Extract the count from the query result

            // check if there is already an account with that email
            const resultEmail = await this.client.query('SELECT * FROM users WHERE email = $1', [
                email,
            ]);
            const countEmail = parseInt(resultEmail.rows.length); // Extract the count from the query result

            if (countUserName > 0 || countEmail > 0) {
                // if match found
                throw new Error('Username or email already taken');
            }

            const userResult = await this.client.query(
                'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *',
                [username, email, password]
            );

            console.log('Server created account: ', username);

            return userResult.rows[0]; // returns the user object
        } catch (err) {
            throw new Error('Error executing query:', err);
        }
    }

    /**
     * @description Retrieves a user account from the database using either the user's email or user ID.
     *
     * @async
     * @method
     * @param {string} [email] - The email of the user.
     * @param {string} [userid] - The ID of the user.
     * @returns {Promise<Object>} - A Promise that resolves to an object representing the user account.
     * User account object contains the following fields: userid, username, email, password, and creationtime.
     * @throws Will throw an error if both email and userid are null, or if the specified email or userid does not exist in the database.
     */
    async getAccount(email = null, userid = null) {
        if (email == null && userid == null) {
            throw new Error('Invalid input to getAccount.');
        }

        try {
            let result = null;

            if (userid != null) {
                result = await this.client.query('SELECT * from users WHERE userid = $1', [userid]);
            } else {
                result = await this.client.query('SELECT * from users WHERE email = $1', [email]);
            }

            if (result.rows.length == 0) {
                throw new Error('email not found.');
            }

            const user = result.rows[0];

            return user;
        } catch (err) {
            throw new Error('Error executing query:', err);
        }
    }

    /**
     * @description Creates a new post or updates to save a cellular automata in the database.
     *
     * @async
     * @method
     * @param {string} userid - The ID of the user creating the post.
     * @param {string} username - The name of the user creating the post.
     * @param {string} title - The title of the post.
     * @param {Buffer} poststate - The state of the post (pixel data encoded as blob).
     * @param {Buffer} postproperties - The properties of the post (json data encoded as blob).
     * @returns {Promise<Object>} - A Promise that resolves to an object representing the created post.
     * @throws Will throw an error if any of the input parameters are null or if there is an error executing the query.
     */
    async createPost(userid, username, title, poststate, postproperties) {
        if (
            userid == null ||
            username == null ||
            title == null ||
            poststate == null ||
            postproperties == null
        ) {
            throw new Error('Invalid input to createPost.');
        }

        try {
            // determining whether the post exists and must be updated or if new post and must be created
            const pathwayDeterminationString =
                'SELECT * FROM posts WHERE userid = $1 AND title = $2;';
            const pathwayValues = [userid, title];

            const pathwayResults = await this.client.query(
                pathwayDeterminationString,
                pathwayValues
            );

            if (pathwayResults.rows.length > 0) {
                // UPDATE PATHWAY
                console.log('Row found:', pathwayResults.rows[0]);
                const updateQuery =
                    'UPDATE posts SET poststate = $1, postproperties = $2 WHERE userid = $3 AND title = $4;';
                const updateValues = [poststate, postproperties, userid, title];

                const updateResults = await this.client.query(updateQuery, updateValues);
                postUpdate = updateResults.row[0];
                return postUpdate;
            } else {
                // CREATION PATHWAY
                console.log('No row found: creating new post');
                const creationtime = this.getCurrentTimeStamp();

                const queryString =
                    'INSERT INTO posts (userid, username, title, poststate, postproperties, creationtime) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;';
                const values = [userid, username, title, poststate, postproperties, creationtime];
                const creationResults = await this.client.query(queryString, values);

                const post = creationResults.rows[0];

                return post;
            }
        } catch (err) {
            throw new Error('Error executing query:', err);
        }
    }

    /**
     * @description Retrieves the state of a post from the database.
     *
     * @async
     * @method
     * @param {string} postid - The ID of the post.
     * @returns {Promise<Object>} - A Promise that resolves to an object containing the state of the post.
     * @throws Will throw an error if there is an error executing the query.
     */
    async getPostState(postid) {
        try {
            const queryString = 'SELECT poststate FROM posts WHERE postid = $1;';

            const values = [postid];

            const result = await this.client.query(queryString, values);

            const postState = result.rows[0];

            return postState;
        } catch (err) {
            throw new Error('Error executing query:', err);
        }
    }

    /**
     * @description Retrieves the properties of a post from the database.
     *
     * @async
     * @method
     * @param {string} postid - The ID of the post.
     * @returns {Promise<Object>} - A Promise that resolves to an object containing the properties of the post.
     * @throws Will throw an error if there is an error executing the query.
     */
    async getPostProperties(postid) {
        try {
            const queryString = 'SELECT postproperties FROM posts WHERE postid = $1;';

            const values = [postid];

            const result = await this.client.query(queryString, values);

            const postProperties = result.rows[0];

            return postProperties;
        } catch (err) {
            throw new Error('Error executing query:', err);
        }
    }

    /**
     * @description Retrieves a list of posts from the database, optionally sorted by a specified criterion.
     *
     * 0 or null: unsorted all posts
     * 1: sort by userID
     * 2: sort by postID
     * 3: sort by creationtime
     *
     * @async
     * @method
     * @param {number} sorting - The sorting criterion. 0 or null for no sorting, 1 to sort by userID, 2 to sort by postID, 3 to sort by creationTime.
     * @param {string} [userID] - The ID of the user. Required if sorting by userID.
     * @returns {Promise<Array<Object>>} - A Promise that resolves to an array of objects, each representing a post.
     * @throws Will throw an error if there is an error executing the query.
     */
    async getPostsList(sorting, userid = null) {
        // formatted query strings for ease of implementation
        const defaultString = 'SELECT postid, username, title FROM POSTS';
        const conditionalString = ' WHERE ';
        const orderByString = ' ORDER BY ';
        const descString = 'DESC';
        const endString = ';';

        try {
            if (sorting == 0 || sorting == null) {
                // no sorting
                const genericSearchQuery = defaultString + endString;
                const result = await this.client.query(genericSearchQuery);
                return result.rows;
            } else if (sorting == 1 && userid != null) {
                // sort by userID
                const userIDSearchQuery =
                    defaultString + conditionalString + 'userid = $1' + endString;
                const values = [userid];
                const result = await this.client.query(userIDSearchQuery, values);
                return result.rows;
            } else if (sorting == 2) {
                // sort by postID
                const postIDSearchQuery = defaultString + orderByString + 'postid' + endString;
                const result = await this.client.query(postIDSearchQuery);
                return result.rows;
            } else if (sorting == 3) {
                // sort by creationTime
                const creationTimeSearchQuery =
                    defaultString + orderByString + 'creationtime' + endString;
                const result = await this.client.query(creationTimeSearchQuery);
                return result.rows;
            }
        } catch (err) {
            throw new Error('Error executing query:', err);
        }
    }
}

const postgreSQLConnection = new PostgreSQLConnect(
    process.env.DATABASE_HOST,
    process.env.DATABASE_USER,
    process.env.DATABASE_PORT,
    process.env.DATABASE_PASSWORD,
    process.env.DATABASE
);

module.exports = {
    postgreSQLConnection,
};
