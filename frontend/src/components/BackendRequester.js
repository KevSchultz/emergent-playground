/**
 * @project Emergent Playground
 * @file BackendRequester.js
 * @overview This class provides methods to send HTTP requests to a backend server.
 * @authors Ethan Foster, Kevin Schultz
 * @exports BackendRequester
 */

/*
HOW IT WORKS:

each function sends a request that is then handled by the backend
in order to complete the stated task that the function does

These functions send the params to the backend and the backend then 
does the needed database functions to complete the task.

all functions will either return a true/object on success
or a false/object with a debugging line

uses built in fetch functions
*/

import BackendRequesterInterface from '../interfaces/BackendRequesterInterface';
import BinaryEncoderDecoder from './BinaryEncoderDecoder';


/**
 * @class BackendRequester
 * @classdesc The BackendRequester class extends the BackendRequesterInterface. 
 * It provides methods to send HTTP requests to a backend server. 
 * These requests are used to perform various operations, such as user registration. 
 * The class uses the Fetch API to send the requests and a BinaryEncoderDecoderInterface instance 
 * to encode and decode data.
 * 
 * @extends BackendRequesterInterface
 */
class BackendRequester extends BackendRequesterInterface {

    /**
     * @description Creates an instance of BackendRequester.
     * 
     * @param {BinaryEncoderDecoderInterface} binaryEncoderDecoder - The binary encoder/decoder to use.
     * @param {string} testURL - The URL to use for testing.
     */
    constructor(binaryEncoderDecoder, testURL = '') {
        super();
        this.binaryEncoderDecoder = binaryEncoderDecoder;
        this.testURL = testURL;
    }

    /**
     * @description Sends a registration request to the server.
     *
     * @param {string} username - The username of the user.
     * @param {string} email - The email of the user.
     * @param {string} password - The password of the user.
     * @returns {Promise<Object>} A promise that resolves to the response from the server.
     */
    async register(username, email, password) {
        const url = this.testURL + '/api/register ';
        const body = JSON.stringify({ username, email, password });
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: body,
        };

        try {
            const response = await fetch(url, options);
            const json = await response.json();

            return json;
        } catch (error) {
            console.error('Error:', error);
        }
    }

    /**
     * @description Sends a login request to the server.
     *
     * @param {string} email - The email of the user.
     * @param {string} password - The password of the user.
     * @returns {Promise<Object>} A promise that resolves to the response from the server.
     */
    async login(email, password) {
        const url = this.testURL + '/api/login';
        const body = JSON.stringify({ email, password });
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: body,
        };

        try {
            const response = await fetch(url, options);
            const json = await response.json();
            return json;
        } catch (error) {
            return undefined;
        }
    }

    /**
     * @description Gets the username of a logged in user.
     *
     * @returns {Promise<Object>} A promise that resolves to the username or undefined from the server.
     */
    async getUsername() {
        const url = this.testURL + '/api/username';
        const options = {
            method: 'GET',
        };

        try {
            const response = await fetch(url, options);
            const json = await response.json();
            return json.username;
        } catch (error) {
            return undefined;
        }
    }

    /**
     * @description Sends a request for uploading a cellular automata post to the server.
     *
     * @param {Object} post - The post to upload.
     * @returns {Promise<Object>} A promise that resolves to the response from the server.
     */
    async uploadPost(title, poststate, postproperties) {

        const encodedPostProperties = await this.binaryEncoderDecoder.encodeJSONToBinary(postproperties);

        let formData = new FormData();

        formData.append('poststate', poststate);
        formData.append('postproperties', encodedPostProperties);

        const url = this.testURL + '/api/upload?title=' + encodeURIComponent(title);

        const options = {
            method: 'POST',
            credentials: 'include', // include cookies in the request
            body: formData,
        };

        try {
            const response = await fetch(url, options);
            return response;
        } catch (error) {
            console.error('Error:', error);
        }
    }

    async downloadPostState(postID) {

        const url = this.testURL + `/api/downloadstate?postid=${encodeURIComponent(postID)}`;

        const options = {
            method: 'GET',
        };

        try {
            const response = await fetch(url, options);
            const binary = await response.blob();
            return binary;
        } catch (error) {
            console.error('Error:', error);
        }

    }

    async serializePostProperties(width, height, ruleData) {
        const ruleDataJSONString = JSON.stringify(ruleData); // stringifes ruleData object
        const postPropertiesJSONString = JSON.stringify({ username, title, ruleDataJSONString });
        const serializedPostProperties = this.encodeBase64(postPropertiesJSONString); // putting rule into binary
        return serializedPostProperties;
    }

    // takes a json that has been sent to the frontend and returns it as a javascript post object
    async unserializePostProperties(serializedPost) {
        const decodedPostProperties = this.decodeBase64(serializedPost); // takes base64 and converts to json
        const jsObjectPostProperties = JSON.parse(decodedPostProperties); // takes json and converts to js object
        let ruleDataObject = JSON.parse(jsObjectPostProperties.ruleDataJSON); // takes ruledata and converts from json to js object
        let postProperties = { // creating proper format for the properties
            width: jsObjectPostProperties.width,
            height: jsObjectPostProperties.height,
            ruleData: ruleDataObject
        };
        return postProperties;
    }

    /**
     * @description Sends a request for downloading a cellular automata post from the server.
     *
     * @param {string} postID - The ID of the post to download.
     * @returns {Promise<Object>} A promise that resolves to the response from the server.
     */
    async downloadPost(postID) {
        const url = this.testURL + `/api/download?postid=${encodeURIComponent(postID)}`;

        const options = {
            method: 'GET',
        };

        try {
            const response = await fetch(url, options);

            console.log(response);

            const post = await response.json();

            console.log(post);

            console.log(this.binaryEncoderDecoder.decodeBinaryToJSON(post.postbinarydata))
        
            return post;
        } catch (error) {
            console.error('Error:', error);
        }
    }
}

const binaryEncoderDecoder = new BinaryEncoderDecoder();
const backendRequester = new BackendRequester(binaryEncoderDecoder);

export default backendRequester;