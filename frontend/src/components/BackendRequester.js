/**
 * @project Emergent Playground
 * @file BackendRequester.js
 * @overview This class provides methods to send HTTP requests to the backend server.
 * @authors Ethan Foster, Kevin Schultz
 * @exports backendRequester
 */

/*
HOW IT WORKS:

each function sends a request that is then handled by the backend
in order to complete the stated task that the function does

These functions send the params to the backend and the backend then 
does the needed database functions to complete the task.

uses built in fetch functions
*/

import BinaryEncoderDecoder from "./BinaryEncoderDecoder";

/**
 * @class BackendRequester
 * @classdesc The BackendRequester class provides methods to send HTTP requests to a backend server.
 * These requests are used to perform various operations, such as user registration.
 * The class uses the Fetch API to send the requests and a BinaryEncoderDecoder instance
 * to encode and decode data.
 */
class BackendRequester {
  /**
   * @description Creates an instance of BackendRequester.
   *
   * @param {BinaryEncoderDecoderInterface} binaryEncoderDecoder - The binary encoder/decoder to use.
   * @param {string} testURL - The URL to use for testing.
   */
  constructor(binaryEncoderDecoder, testURL = "") {
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
    const url = this.testURL + "/api/register ";
    const body = JSON.stringify({ username, email, password });
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: body,
    };

    try {
      const response = await fetch(url, options);
      const json = await response.json();

      return json;
    } catch (error) {
      console.log("Error:", error);
      return undefined;
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
    const url = this.testURL + "/api/login";
    const body = JSON.stringify({ email, password });
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: body,
    };

    try {
      const response = await fetch(url, options);
      const json = await response.json();
      return json;
    } catch (error) {
      console.log("Error:", error);
      return undefined;
    }
  }

  /**
   * @description Sends a logout request to the server.
   *
   * @returns {Promise<Object>} A promise that resolves to the response from the server or undefined.
   */
  async logout() {
    const url = this.testURL + "/api/logout";

    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await fetch(url, options);
      return response;
    } catch (error) {
      console.log("Error:", error);
      return undefined;
    }
  }

  /**
   * @description Gets the username of a logged in user.
   *
   * @returns {Promise<Object>} A promise that resolves to the username from the server or undefined.
   */
  async getUsername() {
    const url = this.testURL + "/api/username";
    const options = {
      method: "GET",
    };

    try {
      const response = await fetch(url, options);
      const json = await response.json();
      return json.username;
    } catch (error) {
      console.error("Error:", error);
      return undefined;
    }
  }

/**
 * Uploads a full post to the server.
 *
 * @async
 * @param {string} title - The title of the post.
 * @param {Blob} poststate - The binary encoding of the state of the post.
 * @param {Object} postproperties - The properties of the post.
 * @returns {Promise<Response>} The response from the server or undefined.
 * @throws {Error} If there is an error during the fetch operation.
 */
  async uploadPost(title, poststate, postproperties) {
    const encodedPostProperties =
      await this.binaryEncoderDecoder.encodeJSONToBinary(postproperties);

    let formData = new FormData();

    formData.append("poststate", poststate);
    formData.append("postproperties", encodedPostProperties);

    const url = this.testURL + "/api/upload?title=" + encodeURIComponent(title);

    const options = {
      method: "POST",
      credentials: "include", // include cookies in the request
      body: formData,
    };

    try {
      const response = await fetch(url, options);
      return response;
    } catch (error) {
      console.error("Error:", error);
      return undefined;
    }
  }


  /**
   * @description Sends a request for downloading a cellular automata post from the server.
   *
   * @param {string} postid - The ID of the post to download.
   * @returns {Promise<Object>} A promise that resolves to the {state: state, properties: properties} from the server or undefined.
   */
  async downloadPost(postid) {
    const responseState = await this.downloadPostState(postid);
    const responseProperties = await this.downloadPostProperties(postid);

    if (responseState == undefined || responseProperties == undefined) {
      return undefined;
    }

    const state = await this.binaryEncoderDecoder.blobToArray(responseState);

    const properties =
      await this.binaryEncoderDecoder.decodeBinaryToJSON(responseProperties);


    return { state: state, properties: properties };
  }

  /**
   * @description Downloads the state of a post from the server.
   *
   * @async
   * @param {string} postid - The ID of the post.
   * @returns {Promise<Blob>} The binary data of the post state or undefined.
   * @throws {Error} If there is an error during the fetch operation.
   */
    async downloadPostState(postid) {
    const url =
      this.testURL + `/api/downloadstate?postid=${encodeURIComponent(postid)}`;

    const options = {
      method: "GET",
    };

    try {
      const response = await fetch(url, options);
      const binary = await response.blob();
      return binary;
    } catch (error) {
      console.error("Error:", error);
      return undefined;
    }
  }

  /**
   * @description Downloads the properties of a post from the server.
   *
   * @async
   * @param {string} postid - The ID of the post.
   * @returns {Promise<Blob>} The binary data of the post properties or undefined.
   * @throws {Error} If there is an error during the fetch operation.
   */
  async downloadPostProperties(postid) {
    const url = `/api/downloadproperties?postid=${encodeURIComponent(postid)}`;

    const options = {
      method: "GET",
    };

    try {
      const response = await fetch(url, options);
      const binary = await response.blob();
      return binary;
    } catch (error) {
      console.error("Error:", error);
      return undefined;
    }
  }

  /**
   * Downloads the list of all posts from the server according to a certain sorting method.
   *
   * @async
   * @param {string} [sorting=null] - The sorting method to be used.
   * @returns {Promise<Array>} The list of posts as a JavaScript array. Returns an empty array if there is an error or if the response is empty.
   * @throws {Error} If there is an error during the fetch operation.
   */
  async downloadPostList(sorting = null) {
    // getting list of all posts according to certain sorting method
    let url = `/api/list?sorting=${encodeURIComponent(sorting)}`;

    if (sorting === null) {
      url = `/api/list`;
    }

    const options = {
      method: "GET",
    };

    try {
      const response = await fetch(url, options); // getting the raw data

      const postListJson = await response.json(); // putting data into json

      if (postListJson == {}) {
        return [];
      }

      return postListJson; // returning the postList as javascript array
    } catch (error) {
      console.log("Error:", error);
      return [];
    }
  }
}

const binaryEncoderDecoder = new BinaryEncoderDecoder();
const backendRequester = new BackendRequester(binaryEncoderDecoder);

export default backendRequester;
