/**
 * @project Emergent Playground
 * @file application.js
 * @overview This file sets up an Express.js server application. It imports necessary modules, configures middleware, 
 * sets up authentication routes, and defines main API routes. It also loads an OpenAPI specification from a YAML file 
 * and sets up a Swagger UI page for API documentation and testing. 
 * @authors Ethan Foster, Kevin Schultz
 * @exports application
 */

const express = require('express');
const cors = require('cors');

const multer = require('multer');
const upload = multer();

const yaml = require('js-yaml');
const swaggerUi = require('swagger-ui-express');
const OpenApiValidator = require('express-openapi-validator');
const path = require('path');
const cookieParser = require('cookie-parser');
const fs = require('fs');

const authentication = require('./authentication');

const { createPostRoute, downloadPostStateRoute, downloadPostPropertiesRoute, getPostsListRoute, getUsernameRoute} = require('./mainAPIRoutes');

const app = express();

// ------ Pre-routing Middleware ------

app.use(cookieParser()); // for parsing cookies
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// ------ OpenAPI Specification Validation and Swagger Documentation Page ------

// Load the OpenAPI specification
const openAPISpecificationPath = path.join(__dirname, '../api-schema/openapi.yaml');
const openAPISpecificationContents = fs.readFileSync(openAPISpecificationPath, 'utf8');
const apiSwaggerDocumentationPage = yaml.load(openAPISpecificationContents);

// Interactive Swagger API Documentation Page (UI for the OpenAPI specification) (Can be used to manual test the API)
app.use('/api/documentation', swaggerUi.serve, swaggerUi.setup(apiSwaggerDocumentationPage));


// ------ Authentication Routes ------

app.post('/api/register', authentication.register);
app.post('/api/login', authentication.login);
app.get('/api/logout', authentication.logout);
app.get('/api/test', authentication.check, (request, response) => {
    console.log("userID from accessToken: ", request.userID);
    response.status(200).json({message: 'Hello Secure World?!'});
});


// ------ Main API Routes ------

app.post('/api/upload', authentication.check, upload.fields([{ name: 'poststate', maxCount: 1 }, { name: 'postproperties', maxCount: 1 }]), createPostRoute);
app.get('/api/downloadstate', authentication.check, downloadPostStateRoute);
app.get('/api/downloadproperties', authentication.check, downloadPostPropertiesRoute);
app.get('/api/list', authentication.check, getPostsListRoute);
app.get('/api/username', authentication.check, getUsernameRoute);

// ------ Static Web Page Routes (Servers the built frontend code from react.) ------

// Serve static files from the "build" directory
app.use(express.static(path.join(__dirname, '../build')));

// Catch all route for client side routing
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build', 'index.html'));
});


// ------ Post-routing Middleware ------


// ------ OpenAPI Specification Validation Middleware ------

// Ensure that Requests and Responses adhere to the OpenAPI specification
app.use(
    OpenApiValidator.middleware({
        apiSpec: openAPISpecificationPath,
        validateRequests: true,
        validateResponses: true,
    })
);


// ------ Error Handling Middleware ------

// Error handling middleware should be the last piece of middleware to use
app.use((err, req, res, next) => {
    console.error('Error stack:', err.stack);
    res.status(err.status || 500).json({
        message: err.message,
        errors: err.errors,
        status: err.status,
    });
});

module.exports = app;
