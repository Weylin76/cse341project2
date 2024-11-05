const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Dance API',
        description: 'API Documentation for the Dance Project',
    },
    host: 'localhost:8080',
    schemes: ['http'],
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./routes/dancerRoutes.js', './routes/danceClassRoutes.js'];

// If swagger-autogen.js is in a subdirectory like 'config', adjust the path to server.js
const serverPath = '../server.js'; // Adjust based on actual location

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    // This require is typically used to start the server automatically after generating the swagger file
    try {
        require(serverPath);
    } catch (error) {
        console.error("Error starting server from swagger-autogen:", error);
        console.log("Ensure the correct path to server.js or run server.js manually.");
    }
});
