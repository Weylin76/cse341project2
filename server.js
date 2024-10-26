const express = require('express');
const mongoose = require('mongoose');
const { ApolloServer } = require('apollo-server-express');
const swaggerUi = require('swagger-ui-express');
const { swaggerDocs } = require('./config/swagger'); 
const typeDefs = require('./graphql/schema');  
const resolvers = require('./graphql/resolvers');  
const config = require('./config/db.config');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 8080;

// Middleware for request logging in non-production environments
if (process.env.NODE_ENV !== 'production') {
    app.use((req, res, next) => {
        console.log(`Incoming request: ${req.method} ${req.url}`);
        next();
    });
}

// Parse incoming requests with JSON payloads
app.use(express.json());

// MongoDB connection without deprecated options and conditional logging
//Chat GPT helped with code
mongoose.connect(config.url)
    .then(() => {
        if (process.env.NODE_ENV !== 'production') {
            console.log('Connected to MongoDB');
        }
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err.message);
        process.exit(1);
    });

// Create an instance of Apollo Server
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({ req }),
    introspection: true,  
    playground: true
});

async function startServer() {
    await server.start();
    server.applyMiddleware({
        app,
        path: '/graphql',
        cors: {
            origin: '*',
            credentials: true
        }
    });

    // Swagger Documentation for GraphQL usage
    app.use('/api-doc', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

    // Error handling for undefined routes
    app.use((req, res) => {
        res.status(404).send('Sorry, that route does not exist');
    });

    // Error handling middleware
    app.use((err, req, res, next) => {
        console.error('Internal server error:', err.stack);
        res.status(500).send('Something broke!');
    });

    // Start the server with conditional logging
    app.listen(port, () => {
        const baseUrl = process.env.NODE_ENV === 'production' ? 'https://cse341project2-s13i.onrender.com' : `http://localhost:${port}`;
        if (process.env.NODE_ENV !== 'production') {
            console.log(`Server is running on ${baseUrl}`);
            console.log(`GraphQL endpoint available at ${baseUrl}/graphql`);
            console.log(`Swagger API Docs available at ${baseUrl}/api-doc`);
        }
    });
}

startServer().catch((err) => console.error('Failed to start server:', err));
