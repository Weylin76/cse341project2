const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Dance API',
            version: '1.0.0',
            description: 'API Documentation for the Dance Project',
            contact: {
                name: 'Weylin Douglas',
            },
        },
        servers: [
            {
                url: 'http://localhost:8080',
                description: 'Local server',
            },
        ],
    },
    // By removing detailed schemas, we focus more on the endpoints rather than the specific object structure.
    apis: ['./routes/*.js'], // Adjust the path to match your project structure
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = { swaggerUi, swaggerDocs };

