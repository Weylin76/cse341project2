// controllers/danceClassController.js
const DanceClass = require('../models/danceClass');

// Controller to get all dance classes
exports.getAllDanceClasses = async (req, res) => {
    try {
        const danceClasses = await DanceClass.find();
        res.status(200).json(danceClasses);
    } catch (err) {
        res.status(500).json({ error: 'An error occurred while fetching dance classes.' });
    }
};

// Controller to get a dance class by ID
exports.getDanceClassById = async (req, res) => {
    try {
        const danceClass = await DanceClass.findById(req.params.id);
        if (!danceClass) {
            return res.status(404).json({ message: 'Dance class not found' });
        }
        res.status(200).json(danceClass);
    } catch (err) {
        res.status(500).json({ error: 'An error occurred while retrieving the dance class.' });
    }
};

// Controller to create a new dance class
exports.createDanceClass = async (req, res) => {
    try {
        const newDanceClass = new DanceClass(req.body);
        const savedDanceClass = await newDanceClass.save();
        res.status(201).json(savedDanceClass);
    } catch (err) {
        res.status(500).json({ error: 'An error occurred while creating the dance class.' });
    }
};

// Controller to update a dance class by ID
exports.updateDanceClass = async (req, res) => {
    try {
        const updatedDanceClass = await DanceClass.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updatedDanceClass) {
            return res.status(404).json({ message: 'Dance class not found' });
        }
        res.status(204).json(updatedDanceClass);
    } catch (err) {
        res.status(500).json({ error: 'An error occurred while updating the dance class.' });
    }
};

// Controller to delete a dance class by ID
exports.deleteDanceClass = async (req, res) => {
    try {
        const deletedDanceClass = await DanceClass.findByIdAndDelete(req.params.id);
        if (!deletedDanceClass) {
            return res.status(404).json({ message: 'Dance class not found' });
        }
        res.status(200).json({ message: 'Dance class deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'An error occurred while deleting the dance class.' });
    }
};

