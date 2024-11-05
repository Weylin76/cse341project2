const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express'); // Add this line
const port = process.env.PORT || 8080;
const host = process.env.NODE_ENV === 'production' ? 'https://cse341project2-s13i.onrender.com/graphql' : `http://localhost:${port}/graphql`;

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Dance GraphQL API',
            version: '1.0.0',
            description: 'GraphQL API Documentation for the Dance Project',
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
                    example: {
                        firstName: 'Katelyn',
                        lastName: 'Douglas',
                        age: 17,
                    }
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
                    example: {
                        name: "Intro to Ballet",
                        semester: "Fall 2024",
                        teacher: "Krista Smith",
                        classLength: 90,
                        classType: "Ballet",
                        location: "Studio A, Downtown Dance Academy",
                        daysOfWeek: ["Monday", "Wednesday", "Friday"],
                        dancers: [
                            {
                                firstName: "Cocoa",
                                lastName: "Douglas",
                                age: 10
                            }
                        ]
                    }
                },
            },
            examples: {
                GetAllDancers: {
                    summary: "GraphQL Query - Get All Dancers",
                    value: `
query {
  dancers {
    firstName
    lastName
    age
  }
}
                    `
                },
                AddDancer: {
                    summary: "GraphQL Mutation - Add a Dancer",
                    value: `
mutation {
  addDancer(dancer: { firstName: "Katelyn", lastName: "Douglas", age: 17 }) {
    id
    firstName
    lastName
    age
  }
}
                    `
                }
            }
        }
    },
    apis: [] 
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = { swaggerUi, swaggerDocs };

