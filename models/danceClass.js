const mongoose = require('mongoose');
const Dancer = require('./dancer'); 

// Define the schema for a dance class
const danceClassSchema = new mongoose.Schema({
    name: { type: String, required: true },
    semester: { type: String, required: true },
    teacher: { type: String, required: true },
    teachingAssistant: { type: String, required: true },
    classLength: { type: Number, required: true }, 
    classType: { type: String, required: true }, 
    location: { type: String, required: true },
    daysOfWeek: { type: [String], required: true },
    dancers: [Dancer.schema]
});

// Create and export the DanceClass model
const DanceClass = mongoose.model('DanceClass', danceClassSchema);
module.exports = DanceClass;

