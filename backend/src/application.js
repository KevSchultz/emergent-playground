const express = require('express');
const cors = require('cors');
const yaml = require('js-yaml');
const swaggerUi = require('swagger-ui-express');
const OpenApiValidator = require('express-openapi-validator');
const path = require('path');
const fs = require('fs');

const authentication = require('./authentication');

const app = express();

// ------ Pre-routing Middleware ------

// CORS enabled only for development!
// app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// ------ OpenAPI Specification Validation and Swagger Documentation Page ------

// Load the OpenAPI specification
const openAPISpecificationPath = path.join(__dirname, '../api/openapi.yaml');
const openAPISpecificationContents = fs.readFileSync(openAPISpecificationPath, 'utf8');
const apiSwaggerDocumentationPage = yaml.load(openAPISpecificationContents);

// Interactive Swagger API Documentation Page (UI for the OpenAPI specification) (Can be used to manual test the API)
app.use('/api/documentation', swaggerUi.serve, swaggerUi.setup(apiSwaggerDocumentationPage));


// ------ Authentication Routes ------

app.post('/api/register', authentication.register);
app.post('/api/login', authentication.login);
app.get('/api/test', authentication.check, (req, res) => {
    res.status(200).json({message: 'Hello Secure World?!'});
});


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
