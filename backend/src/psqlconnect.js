const { Client } = require('pg'); // declares that the client data type requires pg (psql lib)
require('dotenv').config();


/*
the client object is used for the backend connection

the user object is used for our purposes (ie: determining user id)
    not necessarily related to the connection, but is related to emergent playground

the session object is used for keeping track of the user as they are logged in
    ex: most of the functions do not work without a valid session object

PROGRESS:
   EVERYTHING UP TO MAKEPOST() IS WORKING, BUT SHOULD BE STRESS TESTED
*/

/**
 * DONE
 * Connects to the database by making a new client and connecting to a pool
 * Returns the client
 *
 * @returns {Client} The connected PostgreSQL client.
 * @throws {Error} If there is an error while connecting to the database.
 *
 */
function connectToDatabase() {
    const client = new Client({
        host: '127.0.0.1',
        user: 'client',
        port: 5432,
        password: process.env.DATABASE_CLIENT_PASSWORD,
        database: 'clientdata',
    });

    // Attempt to connect to the database
    client.connect((err) => {
        if (err) {
            console.error('Error connecting to the database:', err.stack);
        } else {
            console.log('Connected to the database');
        }
    });

    return client;
}

/**
 * DONE
 * Generate a random integer between min (inclusive) and max (inclusive)
 * used for generating a uniqueID for whatever I need it for
 *
 * @returns {number} The generated random integer.
 */
function getRandomInt() {
    // Generate a random floating-point number between 0 (inclusive) and 1 (exclusive)
    const randomFloat = Math.random();

    // Multiply the random float by the maximum supported integer size (2^31 - 1)
    const maxInt = Math.pow(2, 31) - 1;
    const randomNumber = Math.floor(randomFloat * maxInt);

    return randomNumber;
}

/**
 * DONE
 * Gets the current date and time and formats it as a timestamp string.
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
function getCurrentTimestamp() {
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
 * DONE
 * Gets the current date and time, adds three hours to it, and formats it as a timestamp string.
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
 * @returns {string} The formatted timestamp string representing the current time plus three hours.
 */
function getTimestampThreeHoursAhead() {
    const now = new Date();
    now.setHours(now.getHours() + 3); // Add 3 hours

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
 * DONE
 * Creates a user account as a schema via a query
 *
 * This function checks if the provided username is already in use. If it is, the function returns an error code.
 * If the username is not in use, the function generates a unique user ID and creates a new user account with the provided username, password, and email.
 * The function then inserts the new user account into the database.
 *
 * @param {Client} client - The PostgreSQL client.
 * @param {string} username - The username for the new account.
 * @param {string} email - The email for the new account.
 * @param {string} password - The password for the new account.
 * @returns {(Object)} The created user object
 * @throws {Error} If there is an error while querying the database.
 */
async function createAccount(client, username, email, password) {
    
    // check if there is already an account with that username
    const resultUserName = await client.query('SELECT * FROM users WHERE username = $1', [
        username,
    ]);

    const countUserName = parseInt(resultUserName.rows.length); // Extract the count from the query result

    // check if there is already an account with that email
    const resultEmail = await client.query('SELECT * FROM users WHERE email = $1', [email]);
    const countEmail = parseInt(resultEmail.rows.length); // Extract the count from the query result

    if (countUserName > 0 || countEmail > 0) {
        // if match found
        console.log('username or email taken'); // indicate username or email taken
        throw new Error('Username or email already taken');
    }

    const defaultPermissions = 1; // standard user permissions

    // getting current timestamp
    const formattedTimestamp = getCurrentTimestamp();

    console.log("userResult query");

    const userResult = await client.query(
        'INSERT INTO users (username, email, password, creationtime, permissions) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [username, email, password, formattedTimestamp, defaultPermissions]
    );

    console.log('server side user successfully created');

    return userResult.rows[0]; // returns the user object
}

async function getAccountByEmail(client, email) {
    const result = await client.query('SELECT * FROM users WHERE email = $1', [email]);

    if (result.rows.length === 0) {
        throw new Error('No user found');
    }

    return result.rows[0];
}

/**
 * DONE
 * Logs out by removing the session from both server and client side
 *
 * This function deletes the session with the provided session ID and token from the database.
 * It then nulls out the local session variable and returns true.
 *
 * @param {Client} client - The PostgreSQL client.
 * @param {Object} session - The session to log out.
 * @param {string} session.sessionID - The ID of the session.
 * @param {string} session.sessionToken - The token of the session.
 * @returns {boolean} Always returns true.
 * @throws {Error} If there is an error while querying the database.
 */
async function logOut(client, session) {
    const logOutQuery = 'DELETE FROM sessions WHERE sessionid = $1 AND sessiontoken = $2'; // finds the session and deletes it server side
    console.log('sessionID: ' + session.sessionID); // sends deleted session info to log for debugging
    console.log('sessionToken: ' + session.sessionToken);
    await client.query(logOutQuery, [session.sessionID, session.sessionToken]); // sends the previous query with the sessionID and sessionTOken being inserted
    session = null; // nulling out session local var
    return true; // returning true upon success
}

// IN PROGRESS: WRITTEN BUT NOT TESTED

/**
 * Creates a post and uploads a post to the database.
 *
 * This function generates a unique post ID and creates a new post with the provided parameters.
 * If a parameter is not provided, a default value is used.
 * The function then inserts the new post into the database.
 *
 * @param {Client} client - The PostgreSQL client.
 * @param {Object} session - The session of the user making the post.
 * @param {string} title - The title of the post.
 * @param {string} description - The description of the post.
 * @param {boolean} visibility - The visibility of the post.
 * @param {string} filename - The filename of the post.
 * @param {string} state - The state of the post.
 * @param {string} thumbnail - The thumbnail of the post.
 * @param {string} data - The data of the post.
 * @returns {(number|null)} The ID of the created post, otherwise null.
 * @throws {Error} If there is an error while querying the database.
 */
async function makePost(
    client,
    session,
    title,
    description,
    visibility,
    filename,
    state,
    thumbnail,
    data
) {
    // defaults for the post settings
    const default_title = 'NewPost';
    const default_description = 'This is the default description';
    const default_visibility = true;
    const default_state = null;
    const default_filename = null;
    const default_thumbnail = null;
    const default_data = null;

    // getting current timestamp
    const currentTimestamp = getCurrentTimestamp();
    console.log(currentTimestamp); // outputting to log for debugging

    // creating a new postID
    var newPostID;
    while (true) {
        // loops until a number is generated that is not already in use (avoids session confusion)
        newPostID = getRandomInt();
        const result = await client.query(
            'SELECT COUNT(*) AS count FROM posts WHERE postID = ' + newPostID + ';'
        ); // query checks if a user with that id and username already exists
        if (result.rows[0]) {
            // if match found (if anything returns in the sql query then that would be a match)
            continue; // continue the loop
        } else {
            break; // break loop if no match found
        }
    }

    // checking if values are provided, using default if not
    if (!title) {
        title = default_title;
    }
    if (!description) {
        description = default_description;
    }
    if (!visibility) {
        visibility = default_visibility;
    }
    if (!filename) {
        filename = default_filename;
    }
    if (!state) {
        state = default_state;
    }
    if (!thumbnail) {
        thumbnail = default_thumbnail;
    }
    if (!data) {
        data = default_data;
    }

    // creating the post object
    const post = {
        userID: session.userID,
        postID: newPostID,
        username: session.username,
        creationTime: currentTimestamp,
        title: title,
        description: description,
        views: 0,
        visibility: true,
        filename: filename,
        state: state,
        thumbnail: thumbnail,
        data: data,
    };

    console.log('Post compiled');

    // uploading the post
    const insertPostQuery =
        'INSERT INTO posts (userid, postid, username, creationtime, title, description, filename, state) VALUES (userid, ' +
        post.postID +
        ", '" +
        post.username +
        "', '" +
        post.creationTime +
        "', '" +
        title +
        "', '" +
        description +
        "', '" +
        filename +
        "', state);"; // forming the string query
    console.log('created query: ');
    console.log(insertPostQuery);
    await client.query(insertPostQuery); // sending the query to the server

    // returning the created post object
    return post.postID;
}

/**
 * Gets the info of a post from the database
 *
 * This function queries the database for a post with the provided post ID.
 * If a post with the provided ID exists, the function creates a post object with the post's information and returns it.
 * If no post with the provided ID exists, the function returns null.
 *
 * @param {Client} client - The PostgreSQL client.
 * @param {number} postID - The ID of the post to retrieve information about.
 * @returns {(Object|null)} The post object, or null if no post with the provided ID exists.
 * @throws {Error} If there is an error while querying the database.
 */
async function getPostInfo(client, postID) {
    const searchPostQuery = 'SELECT * FROM posts WHERE postid = ' + postID + ';';
    const resultPostQuery = await client.query(searchPostQuery);
    const postResult = resultPostQuery.rows[0];

    // checking if post exists or not
    if (postRow) {
        // if so then create and return a post object
        const post = {
            userID: postResult.userID,
            postID: postResult.postID,
            username: postResult.username,
            creationTime: postResult.creationtime,
            title: postResult.title,
            description: postResult.description,
            views: postResult.views,
            visibility: postResult.visibility,
            filename: postResult.filename,
            state: postResult.state,
            thumbnail: postResult.thumbnail,
            data: postResult.data,
        };
        console.log('found post: ' + postID + ';'); // indicating we found the post
        return post;
    } else {
        // otherwise return nullS
        console.log('post not found'); // indicating we did not find the post
        return null;
    }
}

/**
 * Deletes a post from the database.
 * Takes the post id and the client.
 * Returns true if post was deleted properly and false if not
 *
 * This function deletes the post with the provided post ID from the database.
 * It then checks if the deletion was successful by querying the database for a post with the provided ID.
 * If a post with the provided ID still exists, the function returns false.
 * If no post with the provided ID exists, the function returns true.
 *
 * @param {Client} client - The PostgreSQL client.
 * @param {number} postID - The ID of the post to delete.
 * @returns {boolean} True if the deletion was successful, false otherwise.
 * @throws {Error} If there is an error while querying the database.
 */
async function deletePost(client, postID) {
    // deletion
    const postDeleteQuery = 'DELETE * FROM posts WHERE postid = ' + postID + ';';
    console.log('deleting postid: ' + postID); // indicating which post is being deleted
    await client.query(postDeleteQuery); // deleting the post from the databse

    // checking the deletion
    console.log('confirming deletion...');
    const postConfirmationQuery =
        'SELECT COUNT(*) AS count FROM posts WHERE postid = ' + postID + ';';
    const resultConfirmation = await client.query(postConfirmationQuery);
    if (resultConfirmation.rows[0] == 1) {
        // if there is still a post with that postid
        console.log('deletion failed');
        return false; // then fail
    } else {
        // if there is no longer a post with that postid
        console.log('deletion successful');
        return true; // then success
    }
}

/**
 * Changes the visibility of a post, used to hide a post
 *
 * This function updates the visibility of the post with the provided post ID in the database to true.
 *
 * @param {Client} client - The PostgreSQL client.
 * @param {number} postid - The ID of the post to hide.
 * @returns {boolean} Always returns true.
 * @throws {Error} If there is an error while querying the database.
 */
async function hidePost(client, postid) {
    // changing the visibility of the post
    await client.query('UPDATE posts SET visibility = true WHERE postid = ' + postid + ';');
    console.log('postID: ' + postid + ' was hidden');
    return true;
}

/**
 * Changes the visibility of a post, used to unhide a post
 *
 * This function updates the visibility of the post with the provided post ID in the database to false.
 *
 * @param {Client} client - The PostgreSQL client.
 * @param {number} postid - The ID of the post to unhide.
 * @returns {boolean} Always returns true.
 * @throws {Error} If there is an error while querying the database.
 */
async function unhidePost(client, postid) {
    // changing the visibility of the post
    await client.query('UPDATE posts SET visibility = false WHERE postid = ' + postid + ';');
    console.log('postID: ' + postid + ' was made visible');
    return true;
}

/**
 * Sorts all posts by newest
 *
 * This function queries the database for all posts and orders them by their creation time in descending order.
 *
 * @param {Client} client - The PostgreSQL client.
 * @returns {Array} An array of post objects, ordered by creation time in descending order.
 * @throws {Error} If there is an error while querying the database.
 */
async function getPostsByNewest(client) {
    const searchResult = await client.query('SELECT * FROM posts ORDER BY creationtime DESC;');
    console.log('searched posts by newest');
    return searchResult.rows;
}

/**
 * Sorts all posts by oldest
 *
 * This function queries the database for all posts and orders them by their creation time in ascending order.
 * It then logs a message indicating that the posts were searched by oldest and returns the rows of the search result.
 *
 * @param {Client} client - The PostgreSQL client.
 * @returns {Array} An array of post objects, ordered by creation time in ascending order.
 * @throws {Error} If there is an error while querying the database.
 */
async function getPostsByOldest(client) {
    const searchResult = await client.query('SELECT * FROM posts ORDER BY creationtime;');
    console.log('searched posts by oldest');
    return searchResult.rows;
}

/**
 * Sorts all posts by most views
 *
 * This function queries the database for all posts and orders them by their views in descending order.
 * It then logs a message indicating that the posts were searched by most viewed and returns the rows of the search result.
 *
 * @param {Client} client - The PostgreSQL client.
 * @returns {Array} An array of post objects, ordered by views in descending order.
 * @throws {Error} If there is an error while querying the database.
 */
async function getPostsByMostViews(client) {
    const searchResult = await client.query('SELECT * FROM posts ORDER BY views DESC;');
    console.log('searched posts by most viewed');
    return searchResult.rows;
}

/**
 * Sorts all posts by views ascending
 *
 * This function queries the database for all posts and orders them by their views in ascending order.
 * It then logs a message indicating that the posts were searched by least viewed and returns the rows of the search result.
 *
 * @param {Client} client - The PostgreSQL client.
 * @returns {Array} An array of post objects, ordered by views in ascending order.
 * @throws {Error} If there is an error while querying the database.
 */
async function getPostsByLeastViews(client) {
    const searchResult = await client.query('SELECT * FROM posts ORDER BY views;');
    console.log('searched posts by least viewed');
    return searchResult.rows;
}

/**
 * Sorts all of the posts by a specific user, ordered by a specified sorting method.
 *
 * This function queries the database for all posts made by the user with the provided user ID.
 * The posts are then ordered based on the provided sorting method.
 * The sorting methods are as follows:
 * 0 - Alphabetically ascending
 * 1 - Alphabetically descending
 * 2 - Newest
 * 3 - Oldest
 * 4 - Most viewed
 * 5 - Least viewed
 *
 * @param {Client} client - The PostgreSQL client.
 * @param {number} userid - The ID of the user whose posts to retrieve.
 * @param {number} sorting - The sorting method to use.
 * @returns {Array} An array of post objects, ordered based on the provided sorting method.
 * @throws {Error} If there is an error while querying the database.
 */
async function getPostsByUser(client, userid, sorting) {
    // defining constants for easier string formatting

    const standardQuery = 'SELECT * FROM posts WHERE userid = ' + userid;
    const endQuery = ';';

    const descendQuery = 'ORDER BY ';
    if (sorting === 0) {
        // alpha ascend
    } else if (sorting === 1) {
        // alpha descend
        client.query(standardQuery + endQuery);
    } else if (sorting === 2) {
        // newest
        client.query(standardQuery + endQuery);
    } else if (sorting === 3) {
        // oldest
        client.query(standardQuery + endQuery);
    } else if (sorting === 4) {
        // most viewed
        client.query(standardQuery + endQuery);
    } else if (sorting === 5) {
        // leaast viewed
        client.query(standardQuery + endQuery);
    }
}

module.exports = {
    connectToDatabase,
    getRandomInt,
    getCurrentTimestamp,
    getTimestampThreeHoursAhead,
    createAccount,
    getAccountByEmail,
    logOut,
    makePost,
    getPostInfo,
    deletePost,
    hidePost,
    unhidePost,
    getPostsByNewest,
    getPostsByOldest,
    getPostsByMostViews,
    getPostsByLeastViews,
    getPostsByUser,
};
