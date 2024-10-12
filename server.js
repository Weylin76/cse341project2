const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const { swaggerUi: swaggerSetup, swaggerDocs } = require('./config/swagger');
const dancerRoutes = require('./routes/dancerRoutes');
const danceClassRoutes = require('./routes/danceClassRoutes');
const config = require('./config/db.config');

// Initialize Express
const app = express();
const port = process.env.PORT || 8080;

// Middleware setup
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(config.url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected successfully'))
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err.message);
        process.exit(1);
    });

// Swagger API Documentation
app.use('/api-doc', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Register routes for dancers and dance classes
app.use('/dancers', dancerRoutes);
app.use('/danceclasses', danceClassRoutes);

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
    console.log(`Swagger API Docs available at http://localhost:${port}/api-doc`);
});



