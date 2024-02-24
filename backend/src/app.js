const express = require('express');
const cors = require('cors');
const yaml = require('js-yaml');
const swaggerUi = require('swagger-ui-express');
const OpenApiValidator = require('express-openapi-validator');
const path = require('path');
const fs = require('fs');

const authentication = require('./authentication');

const app = express();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Load the OpenAPI specification
const openAPISpecificationPath = path.join(__dirname, '../api/openapi.yaml');
const openAPISpecificationContents = fs.readFileSync(openAPISpecificationPath, 'utf8');
const apiSwaggerDocumentationPage = yaml.load(openAPISpecificationContents);

// API documentation route
app.use('/api/documentation', swaggerUi.serve, swaggerUi.setup(apiSwaggerDocumentationPage));

// API routes
app.post('/api/login', authentication.login);

// It's crucial to place the OpenAPI Validator middleware after your API routes
app.use(
    OpenApiValidator.middleware({
        apiSpec: openAPISpecificationPath,
        validateRequests: true, // (optional) Validate requests
        validateResponses: true, // (optional) Validate responses
        // You can add other OpenAPI Validator options here
    })
);

// Error handling middleware should be the last piece of middleware to use
app.use((err, req, res, next) => {
    console.error('Error stack:', err.stack);
    res.status(err.status || 500).json({
        message: err.message,
        errors: err.errors,
        status: err.status,
    });
});

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, '../build')));

// Catch all route for client side routing (must be the last route defined)
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

module.exports = app;
