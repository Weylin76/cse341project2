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

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    require('./server.js'); // Your project's entry point
});
