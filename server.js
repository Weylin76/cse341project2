const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

// Load environment variables
dotenv.config();

// Initialize Express
const app = express();
const port = process.env.PORT || 3000;

// Enable CORS for all routes
app.use(cors());

// Middleware to parse incoming JSON requests
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected successfully'))
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err.message);
        process.exit(1);
    });

// Define Schema for the dance class
const danceClassSchema = new mongoose.Schema({
    name: String,
    semester: String,
    teacher: String,
    teachingAssistant: String,
    lengthOfClass: Number, // Length in hours
    typeOfClass: String,
    location: String,
    daysOfWeek: [String],
    dancers: [{
        firstName: String,
        lastName: String,
        age: Number
    }]
});

const DanceClass = mongoose.model('DanceClass', danceClassSchema);

// REST API Endpoints

// GET all dance classes
app.get('/dance-classes', async (req, res) => {
    try {
        const classes = await DanceClass.find();
        res.status(200).json(classes);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET a dance class by ID
app.get('/dance-classes/:id', async (req, res) => {
    try {
        const danceClass = await DanceClass.findById(req.params.id);
        if (!danceClass) {
            return res.status(404).json({ message: 'Dance class not found' });
        }
        res.status(200).json(danceClass);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST a new dance class
app.post('/dance-classes', async (req, res) => {
    try {
        const newDanceClass = new DanceClass(req.body);
        const savedClass = await newDanceClass.save();
        res.status(201).json(savedClass);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// PUT to update a dance class by ID
app.put('/dance-classes/:id', async (req, res) => {
    try {
        const updatedClass = await DanceClass.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedClass) {
            return res.status(404).json({ message: 'Dance class not found' });
        }
        res.status(200).json(updatedClass);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// DELETE a dance class by ID
app.delete('/dance-classes/:id', async (req, res) => {
    try {
        const deletedClass = await DanceClass.findByIdAndDelete(req.params.id);
        if (!deletedClass) {
            return res.status(404).json({ message: 'Dance class not found' });
        }
        res.status(200).json({ message: 'Dance class deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
