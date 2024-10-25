const mongoose = require('mongoose');

// Define the schema for a dancer
const dancerSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    age: { type: Number, required: true }
});

// Create and export the Dancer model
const Dancer = mongoose.model('Dancer', dancerSchema);
module.exports = Dancer;
