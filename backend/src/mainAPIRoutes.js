/**
 * @project Emergent Playground
 * @file mainAPIRoutes.js
 * @overview This file exports several route handlers for the Emergent Playground project. These include handlers for 
 * creating a new post, downloading post state, downloading post properties, downloading a list of posts, and getting a 
 * username. Each handler interacts with the PostgreSQL database to perform its function. 
 * @authors Kevin Schultz
 * @exports createPostRoute
 * @exports downloadPostStateRoute
 * @exports downloadPostPropertiesRoute
 * @exports downloadPostListRoute
 * @exports getUsernameRoute
 */

const { request } = require('https');
const { postgreSQLConnection } = require('./postgreSQLConnect');


/**
 * @description Handles the creation of a new post.
 * 
 * @async
 * @exports
 * @function
 * @param {Object} request - The Express request object.
 * @param {string} request.userid - The ID of the user making the request.
 * @param {Object} request.query - The query parameters.
 * @param {string} request.query.title - The title of the post.
 * @param {Object} request.files - The files sent in the request.
 * @param {Buffer} request.files['poststate'] - The state of the post.
 * @param {Buffer} request.files['postproperties'] - The properties of the post.
 * @param {Object} response - The Express response object.
 * @returns {Promise<void>} - A Promise that resolves when the response has been sent.
 * @throws Will throw an error if the user ID is not provided, the title is not provided, the files are not provided, or there is an error creating the post.
 */
exports.createPostRoute = async (request, response) => {

    if (!request.query.title) {
        console.log('createPostRoute: title not provided.');
        response.sendStatus(400);
        return;
    }

    if (!request.files) {
        console.log("createPostRoute: files not provided.");
        response.sendStatus(400);
        return;
    }

    if (!request.files['poststate'] || !request.files['postproperties']) {
        console.log("createPostRoute: poststate or postproperties not provided.");
        response.sendStatus(400);
        return;
    }

    try {

        const user = await postgreSQLConnection.getAccount(null, request.userid);

        if (!user) {
            console.log("createPostRoute: user not found.");
            response.sendStatus(401);
            return;
        }

        const userid = user.userid;
        const username = user.username;
        const title = request.query.title;
        const poststate = request.files['poststate'][0].buffer;
        const postproperties = request.files['postproperties'][0].buffer;

        console.log('userID: ', userid);
        console.log('username: ', username);
        console.log('title: ', title);
        console.log('poststate: ', poststate);
        console.log('postproperties: ', postproperties);

        
        const post = await postgreSQLConnection.createPost(userid, username, title, poststate, postproperties);

        response.status(200).json({ postid: post.postid, username: post.username, title: post.title });
    } catch (err) {
        console.log(err);
        response.sendStatus(401);
    }
};

/**
 * @description Handles the request to download the state of a post.
 * 
 * @async
 * @exports
 * @function
 * @param {Object} request - The Express request object.
 * @param {string} request.userid - The ID of the user making the request.
 * @param {Object} request.query - The query parameters.
 * @param {string} request.query.postid - The ID of the post whose state is to be downloaded.
 * @param {Object} response - The Express response object.
 * @returns {Promise<void>} - A Promise that resolves when the response has been sent.
 * @throws Will throw an error if the user ID is not provided, the post ID is not provided, or there is an error retrieving the post state.
 */
exports.downloadPostStateRoute = async (request, response) => {
    
    if (!request.userid) {
        response.sendStatus(401);
        return;
    }

    if (!request.query.postid) {
        response.sendStatus(400);
        return;
    }

    try {
        const postid = request.query.postid;

        const post = await postgreSQLConnection.getPostState(postid);

        response.status(200).send(post.poststate);

    } catch (err) {
        console.log(err);
        response.sendStatus(401);
    }
};

exports.downloadPostPropertiesRoute = async (request, response) => {

    if (!request.userid) {
        response.sendStatus(401);
        return;
    }

    if (!request.query.postid) {
        response.sendStatus(400);
        return;
    }

    try {
        const postid = request.query.postid;

        const post = await postgreSQLConnection.getPostProperties(postid);

        response.status(200).send(post.postproperties);

    } catch (err) {
        console.log(err);
        response.sendStatus(401);
    }
};

/**
 * @description Handles the request to get a list of posts from the database, optionally sorted by a specified criterion.
 * 
 * request.query.storting:
 * 0 or null: unsorted all posts
 * 1: sort by userID
 * 2: sort by postID
 * 3: sort by creationtime
 * 
 * @async
 * @exports
 * @function
 * @param {Object} request - The Express request object.
 * @param {string} request.userid - The ID of the user making the request.
 * @param {Object} request.query - The query parameters.
 * @param {number} request.query.sorting - The sorting criterion. 0 or null for no sorting, 1 to sort by userID, 2 to sort by postID, 3 to sort by creationTime.
 * @param {Object} response - The Express response object.
 * @returns {Promise<void>} - A Promise that resolves when the response has been sent.
 * @throws Will throw an error if the user ID is not provided, the sorting criterion is not provided, or there is an error retrieving the posts list.
 */
exports.getPostsListRoute = async (request, response) => {

    if (!request.query.sorting) {
        request.query.sorting = 0;
    }

    if (!request.query.sorting != 0 && !request.query.sorting != 1 && !request.query.sorting != 2 && !request.query.sorting != 3) {
        response.sendStatus(400);
        return;
    }

    try {
        const user = await postgreSQLConnection.getAccount(null, request.userid);

        if (!user) {
            response.sendStatus(401);
            return;
        }

        const userid = user.userid;
        const sorting = request.query.sorting;

        const postsList = await postgreSQLConnection.getPostsList(sorting, userid);

        console.log(postsList);

        response.status(200).json(postsList);
    } catch (err) {
        console.log(err);
        response.sendStatus(401);
    }
};

/**
 * @description Gets the username associated with a given user ID.
 * 
 * @async
 * @function
 * @param {Object} request - The HTTP request object, expected to contain a 'userID' property.
 * @param {Object} response - The HTTP response object used to send the response.
 * @returns {Promise<void>} A Promise that resolves when the function has completed.
 * @throws Will send a 401 status if the 'userID' is not provided in the request, if no user is found with the provided 'userID', or if an error occurs during execution.
 */
exports.getUsernameRoute = async (request, response) => {
    if (!request.userid) {
        response.sendStatus(401);
        return;
    }

    try {
        const user = await postgreSQLConnection.getAccount(null, request.userid);

        if (!user) {
            response.sendStatus(401);
            return;
        }

        response.status(200).json({ username: user.username });
    } catch (err) {
        console.log(err);
        response.sendStatus(401);
    }
}