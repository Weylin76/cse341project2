const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const port = process.env.PORT || 8080;
const host = process.env.NODE_ENV === 'production' ? 'https://your-render-app-url.onrender.com' : `http://localhost:${port}`;

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
                url: host,
                description: process.env.NODE_ENV === 'production' ? 'Production server' : 'Local server',
            },
        ],
        components: {
            schemas: {
                Dancer: {
                    type: 'object',
                    properties: {
                        firstName: { type: 'string' },
                        lastName: { type: 'string' },
                        age: { type: 'integer' },
                    },
                },
                DanceClass: {
                    type: 'object',
                    properties: {
                        name: { type: 'string' },
                        semester: { type: 'string' },
                        teacher: { type: 'string' },
                        classLength: { type: 'integer' },
                        classType: { type: 'string' },
                        location: { type: 'string' },
                        daysOfWeek: {
                            type: 'array',
                            items: { type: 'string' },
                        },
                        dancers: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    firstName: { type: 'string' },
                                    lastName: { type: 'string' },
                                    age: { type: 'integer' },
                                },
                            },
                        },
                    },
                },
            },
        },
    },
    apis: ['./routes/*.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = { swaggerUi, swaggerDocs };

