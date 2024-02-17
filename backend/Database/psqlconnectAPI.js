const {Client} = require('pg'); // declares that the client data type requires pg (psql lib)

/*
the client object is used for the backend connection

the user object is used for our purposes (ie: determining user id)
    not necessarily related to the connection, but is related to emergent playground

the session object is used for keeping track of the user as they are logged in
    ex: most of the functions do not work without a valid session object

PROGRESS:
   EVERYTHING UP TO MAKEPOST() IS WORKING, BUT SHOULD BE STRESS TESTED
*/

// DONE
// connects to the database by making a new client and connecting to a pool
// returns the client
function connectToDatabase() {
    const client = new Client({
        host: "127.0.0.1",
        user: "client",
        port: 5432,
        password: "123456",
        database: "clientdata"
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

// DONE
// Generate a random integer between min (inclusive) and max (inclusive)
// used for generating a uniqueID for whatever I need it for
function getRandomInt() {
    // Generate a random floating-point number between 0 (inclusive) and 1 (exclusive)
    const randomFloat = Math.random();
    
    // Multiply the random float by the maximum supported integer size (2^31 - 1)
    const maxInt = Math.pow(2, 31) - 1;
    const randomNumber = Math.floor(randomFloat * maxInt);
    
    return randomNumber;
}

// DONE
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

// DONE
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


// DONE
// creates a user account as a schema via a query
// client object, username, pass as args
// returns bool for success or fail
// error codes: 1 means that the username was taken
async function createAccount(client, username, password, email) {
    // check if there is already an accound with that username
    const defaultPermissions = 1; // standard user permissions

    // check if the username is valid
    const resultUserName = await client.query('SELECT COUNT(*) AS count FROM users WHERE username = \'' + username + '\';');  // query checks if a user with that username already exists
    const countUserName = parseInt(resultUserName.rows[0].count); // Extract the count from the query result
    if(countUserName > 0){ // if match found
        console.log('username taken'); // indicate username taken
        return 1; // username taken error code
    }

    // getting current timestamp
    const formattedTimestamp = getCurrentTimestamp();
    var newUserID; // declaring var outside of loop
    
    // creating a new userID
    while(true){ // loops until a number is generated that is not already in use (avoids session confusion)
        newUserID = getRandomInt();
        const result = await client.query('SELECT COUNT(*) AS count FROM users WHERE userID = ' + newUserID + ';');  // query checks if a user with that id and username already exists
        const count = parseInt(result.rows[0].count); // Extract the count from the query result
        if(count > 0){ // if match found
            continue; // continue the loop
        } else {
            break; // break loop if no match found
        }
    }

    // create a new user object
    var user = {
        userID: newUserID,
        username: username,
        password: password,
        email: email, // not needed, can be left as NULL
        creationDate: formattedTimestamp, // DATE data type
        permissions: defaultPermissions // permissions of 1, standard user
    }

    // formatted sql query, might be able to use a query generator for this
    var userQuery = 'INSERT INTO users (userid, username, password, email, creationTime, permissions) VALUES (' + user.userID + ', \'' + user.username + '\', \'' + user.password + '\', \'' + user.email + '\', \'' + user.creationDate + '\', ' + user.permissions + ');';

    client.query(userQuery); // query to insert the new user as SQL
    console.log('produced query: ');
    console.log(userQuery);

    console.log("server side user successfully created");

    return user // returns the user object
}

// DONE
// logs the user in by checking the provided credentials, creating a new session object, and then returning that session after entering it into the database
// takes the client object, username, and password
async function logIn(client, username, password) {
    // Determining whether there is a valid user with this username and password
    const userSearchQuery = 'SELECT * FROM users WHERE username = $1 AND password = $2';
    const resultUserSearch = await client.query(userSearchQuery, [username, password]);

    // Checking if user exists
    if (resultUserSearch.rows.length === 0) {
        console.log("No user found");
        return null;
    }

    const userData = resultUserSearch.rows[0];
    const userID = userData.userid;

    // Creating a new session with the newly found user
    let newSessionID, newSessionToken;

    // Generate unique session ID and token
    while (true) {
        newSessionID = getRandomInt();
        newSessionToken = getRandomInt();

        // Check if the generated session ID and token already exist
        const sessionExistsQuery = 'SELECT COUNT(*) AS count FROM sessions WHERE sessionid = $1 OR sessiontoken = $2';
        const result = await client.query(sessionExistsQuery, [newSessionID, newSessionToken]);

        if (result.rows[0].count === '0') {
            // No matching session ID or token found, break the loop
            break;
        }
    }

    // Insert the session information into the database
    const currentTimestamp = getCurrentTimestamp();
    const endTimestamp = getTimestampThreeHoursAhead();

    const sessionInsertQuery = `
        INSERT INTO sessions (userid, sessionid, sessiontoken, creationtime, expiretime, expired)
        VALUES ($1, $2, $3, $4, $5, $6)
    `;
    await client.query(sessionInsertQuery, [userID, newSessionID, newSessionToken, currentTimestamp, endTimestamp, false]);

    // Return the created session object
    return {
        userID: userID,
        sessionID: newSessionID,
        sessionToken: newSessionToken,
        creationTime: currentTimestamp,
        expireTime: endTimestamp,
        expired: false
    };
}

// DONE
// logs out by removing the session from both server and client side
async function logOut(client, session) {
    const logOutQuery = 'DELETE FROM sessions WHERE sessionid = $1 AND sessiontoken = $2'; // finds the session and deletes it server side
    console.log('sessionID: ' + session.sessionID); // sends deleted session info to log for debugging 
    console.log('sessionToken: ' + session.sessionToken); 
    await client.query(logOutQuery, [session.sessionID, session.sessionToken]); // sends the previous query with the sessionID and sessionTOken being inserted 
    session = null; // nulling out session local var
    return true; // returning true upon success
}

// IN PROGRESS

// WRITTEN, NOT TESTED
// creates a post and uploads a post to the database
// returns the postID if successful, null if not
async function makePost(client, session, title, description, visibility, filename, state, thumbnail, data){
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
    while(true){ // loops until a number is generated that is not already in use (avoids session confusion)
        newPostID = getRandomInt();
        const result = await client.query('SELECT COUNT(*) AS count FROM posts WHERE postID = ' + newPostID + ';');  // query checks if a user with that id and username already exists
        if(result.rows[0]){ // if match found (if anything returns in the sql query then that would be a match)
            continue; // continue the loop
        } else {
            break; // break loop if no match found
        }
    }

    // checking if values are provided, using default if not
    if(!title){
        title = default_title;
    }
    if(!description){
        description = default_description;
    }
    if(!visibility){
        visibility = default_visibility;
    }
    if(!filename){
        filename = default_filename;
    }
    if(!state){
        state = default_state;
    }
    if(!thumbnail){
        thumbnail = default_thumbnail;
    }
    if(!data){
        data = default_data
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
        data: data
    };

    console.log('Post compiled');

    // uploading the post
    const insertPostQuery = 'INSERT INTO posts (userid, postid, username, creationtime, title, description, filename, state) VALUES (userid, ' + post.postID + ', \'' + post.username + '\', \'' + post.creationTime + '\', \'' + title + '\', \'' + description + '\', \'' + filename + '\', state);'; // forming the string query
    console.log('created query: ');
    console.log(insertPostQuery);
    await client.query(insertPostQuery); // sending the query to the server

    // returning the created post object
    return post.postID;
}

// gets the info of a post from the database
// returns the post if found and NULL if no post was found
async function getPostInfo(client, postID){
    const searchPostQuery = 'SELECT * FROM posts WHERE postid = ' + postID + ';';
    const resultPostQuery = await client.query(searchPostQuery);
    const postResult = resultPostQuery.rows[0];

    // checking if post exists or not
    if(postRow){ // if so then create and return a post object
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
            data: postResult.data
        };
        console.log('found post: ' + postID + ';'); // indicating we found the post
        return post;
    } else { // otherwise return nullS
        console.log('post not found'); // indicating we did not find the post
        return null;
    }
}

// deletes a post from the database
// takes the post id and the client
// returns true if post was deleted properly and false if not
async function deletePost(client, postID){
    // deletion
    const postDeleteQuery = 'DELETE * FROM posts WHERE postid = ' + postID + ';';
    console.log('deleting postid: ' + postID); // indicating which post is being deleted
    await client.query(postDeleteQuery); // deleting the post from the databse

    // checking the deletion
    console.log('confirming deletion...')
    const postConfirmationQuery = 'SELECT COUNT(*) AS count FROM posts WHERE postid = ' + postID + ';';
    const resultConfirmation = await client.query(postConfirmationQuery);
    if(resultConfirmation.rows[0] == 1){ // if there is still a post with that postid
        console.log('deletion failed');
        return false; // then fail
    } else { // if there is no longer a post with that postid
        console.log('deletion successful');
        return true; // then success
    }
}

// changes the visibility of a post, used to hide a post
async function hidePost(client, postid){
    // changing the visibility of the post
    await client.query('UPDATE posts SET visibility = true WHERE postid = ' + postid + ';');
    console.log('postID: ' + postid + ' was hidden');
    return true;
}

// changes the visibility of a post, used to unhide a post
async function unhidePost(client, postid){
    // changing the visibility of the post
    await client.query('UPDATE posts SET visibility = false WHERE postid = ' + postid + ';');
    console.log('postID: ' + postid + ' was made visible');
    return true;
}

// sorts all posts by newest
// returns the results as an object
async function getPostsByNewest(client){
    const searchResult = await client.query('SELECT * FROM posts ORDER BY creationtime DESC;');
    console.log('searched posts by newest');
    return searchResult.rows;
}

// sorts all posts by oldest
// returns the results as an object
async function getPostsByOldest(client){
    const searchResult = await client.query('SELECT * FROM posts ORDER BY creationtime;');
    console.log('searched posts by oldest');
    return searchResult.rows;
}

// sorts all posts by most views
// returns the results as an object
async function getPostsByMostViews(client){
    const searchResult = await client.query('SELECT * FROM posts ORDER BY views DESC;');
    console.log('searched posts by most viewed');
    return searchResult.rows;
}

// sorts all posts by views ascending
async function getPostsByLeastViews(client){
    const searchResult = await client.query('SELECT * FROM posts ORDER BY views;');
    console.log('searched posts by least viewed');
    return searchResult.rows;
}

// sorts all of the posts by the user
// takes client object, userid, and sorting selection
// sorting is an int that represents different ways to sort the data
// sorts by:
// 0: alphabetical ascending
// 1: alphabetical descending
// 2: newest
// 3: oldest
// 4: most viewed
// 5: least viewed 
async function getPostsByUser(client, userid, sorting){
    // defining constants for easier string formatting
    
    const standardQuery = 'SELECT * FROM posts WHERE userid = ' + userid;
    const endQuery = ';';

    const descendQuery = 'ORDER BY ';
    if (sorting === 0) { // alpha ascend

    } else if (sorting === 1) { // alpha descend
        client.query(standardQuery + endQuery);
    } else if (sorting === 2) { // newest
        client.query(standardQuery + endQuery);
    } else if (sorting === 3) { // oldest
        client.query(standardQuery + endQuery);
    } else if (sorting === 4) { // most viewed
        client.query(standardQuery + endQuery);
    } else if (sorting === 5) { // leaast viewed
        client.query(standardQuery + endQuery);
    }  
}