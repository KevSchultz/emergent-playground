/**
 * @project Emergent Playground
 * @file BackendRequesterInterface.js
 * @overview This file defines the interface for BackendRequester. 
 * It abstracts the process of communicating with the backend via HTTP requests, although it does not include the actual implementation.
 * @authors Ethan Foster, Kevin Schultz
 * @exports BackendRequesterInterface
 */


export default class BackendRequesterInterface {

    constructor() {}

    async register(username, email, password) {}

    async login(email, password) {}

    async uploadPost() {}

    async downloadPost() {}

    async deletePost() {}

    async getPostList() {}

}

