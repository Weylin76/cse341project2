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
            servers: ['http://localhost:8080'],
        },
    },
    apis: ['./routes/*.js'], // Adjust the path as needed
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = { swaggerUi, swaggerDocs };
