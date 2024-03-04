const express = require('express');
const app = express();

app.use(express.json()); // for parsing application/json
// put cors input for development only


/*
    HOW IT WORKS:

    this is boilerplate code for receiving the data from the client
    and calling the associated api for the database.

    parses the request body and determines the corresponding DB
    api function to call.

    A response is then sent to the client indicating a success and
    the associated information. This is done by returning via .json
    in the response body 
*/

// main function that calls all others. Only this needs to be put
// into a listening loop in the server js
async function receive(req){
    // sanitize the request body
    // parse request body
    // look at function number
        // if NUMBER
            // do associated function
            // create response
    // send the response to the client
    return json;
}

// returns a formatted request object by putting the data into the body of the request object
async function respond(data){

    return res;
}

// ensures compatibility and security with response body
// only checks to make sure that the number of fields and the associated data type is what is expected for the data type
// the number of fields is always one greater because of the
// implementation only checks that data is binary
// returns false if fail and true if pass
async function sanitizeJSON(funcNum, jsonObject){
    // step 1 check that it is actually a json
    try {
        JSON.parse(str);
    } catch (e) {
        return false; // if not then it is not compatible, fail
    }
    
    // checking that the json is in the correct format
    if(funcNum = 1){ // createaccount
        let numFields = Object.keys(jsonObject).length;
        if (numFields != 4) {
            return false; // does notmatch expeced number of fields
        }
        function isValidJSONString(jsonObject) {
            try {
                JSON.parse(str);
                return true;
            } catch (error) {
                return false;
            }
        }
    } else if (funcNum = 2){ // logIn
        let numFields = Object.keys(jsonObject).length;
        if (numFields != 3) {
            return false; // does notmatch expeced number of fields
        }
        function isValidJSONString(jsonObject) {
            try {
                JSON.parse(str);
                return true;
            } catch (error) {
                return false;
            }
        }
    } else if (funcNum = 3){ // logOut
        let numFields = Object.keys(jsonObject).length;
        if (numFields != 3) {
            return false; // does notmatch expeced number of fields
        }
        function isValidJSONString(jsonObject) {
            try {
                JSON.parse(str);
                return true;
            } catch (error) {
                return false;
            }
        }
    } else if (funcNum = 4){ // createPost
        let numFields = Object.keys(jsonObject).length;
        if (numFields > 8) {
            return false; // does notmatch expeced number of fields
        }
            try {
                JSON.parse(str);
                return true;
            } catch (error) {
                return false;
            }
    } else if (funcNum = 5){ // editPost
        let numFields = Object.keys(jsonObject).length;
        if (numFields > 8) {
            return false; // does notmatch expeced number of fields
        }
            try {
                JSON.parse(str);
                return true;
            } catch (error) {
                return false;
            }
    } else if (funcNum = 6){ // getSpecificPost
        let numFields = Object.keys(jsonObject).length;
        if (numFields != 1) {
            return false; // does notmatch expeced number of fields
        }
        function isValidJSONString(jsonObject) {
            try {
                JSON.parse(str);
                return true;
            } catch (error) {
                return false;
            }
        }
    } else if (funcNum = 7){ // getPosts
        let numFields = Object.keys(jsonObject).length;
        if (numFields != 2) {
            return false; // does notmatch expeced number of fields
        }
            try {
                JSON.parse(str);
                return true;
            } catch (error) {
                return false;
            }
    } else if (funcNum = 8){ // getPostsByUser
        let numFields = Object.keys(jsonObject).length;
        if (numFields != 1) {
            return false; // does notmatch expeced number of fields
        }
            try {
                JSON.parse(str);
                return true;
            } catch (error) {
                return false;
            } 
    } else if (funcNum = 9){ // createRule
        let numFields = Object.keys(jsonObject).length;
        if (numFields != 4) {
            return false; // does notmatch expeced number of fields
        }
            try {
                JSON.parse(str);
                return true;
            } catch (error) {
                return false;
            }
    } else if (funcNum = 10){ // getRules
        let numFields = Object.keys(jsonObject).length;
        if (numFields != 4) {
            return false; // does notmatch expeced number of fields
        }
            try {
                JSON.parse(str);
                return true;
            } catch (error) {
                return false;
            }
    } else if (funcNum = 11){ // editRule
        let numFields = Object.keys(jsonObject).length;
        if (numFields != 4) {
            return false; // does notmatch expeced number of fields
        }
            try {
                JSON.parse(str);
                return true;
            } catch (error) {
                return false;
            }
    }
}


// takes a javascript array, converts it to json, then converts it into a binary string
// only used for saving state
function encodeBase64(array) {
    // Step 1: Stringify the array
    let json = JSON.stringify(array);

    // Step 2: Convert the string to a Buffer
    let buffer = Buffer.from(json, 'utf8');

    // Step 3: Convert the Buffer to a base64 string
    return buffer.toString('base64');
}

// takes a base64 binary string and then converts it back into json then into an array
// only used for saving state
function decodeBase64(base64) {
    // Step 1: Convert the base64 string to a Buffer
    let buffer = Buffer.from(base64, 'base64');

    // Step 2: Convert the Buffer to a string
    let json = buffer.toString('utf8');

    // Step 3: Parse the string back into an array
    return JSON.parse(json);
}

// checks the data type of each value in a json and returns the types as an array
// ex: 
// done as an array of string value pairs
/*
{
    "name": "string",
    "age": "number",
    "isStudent": "boolean",
    "friends": "object",
    "address": {
        "street": "string",
        "city": "string"
    }
}
*/
// return 
function checkDataType(obj) {
    let types = {};

    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            if (typeof obj[key] === 'object' && obj[key] !== null) {
                // If the value is an object, recursively check its properties
                types[key] = checkDataType(obj[key]);
            } else {
                types[key] = typeof obj[key];
            }
        }
    }
    return types;
}
