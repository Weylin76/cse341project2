// controllers/dancerController.js
const Dancer = require('../models/dancer');

// Controller to get all dancers
exports.getAllDancers = async (req, res) => {
    try {
        const dancers = await Dancer.find();
        res.status(200).json(dancers);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Controller to get a dancer by ID
exports.getDancerById = async (req, res) => {
    try {
        const dancer = await Dancer.findById(req.params.id);
        if (!dancer) {
            return res.status(404).json({ message: 'Dancer not found' });
        }
        res.status(200).json(dancer);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Controller to create a new dancer
exports.createDancer = async (req, res) => {
    try {
        const newDancer = new Dancer(req.body);
        const savedDancer = await newDancer.save();
        res.status(201).json(savedDancer);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Controller to update a dancer by ID
exports.updateDancer = async (req, res) => {
    try {
        const updatedDancer = await Dancer.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedDancer) {
            return res.status(404).json({ message: 'Dancer not found' });
        }
        res.status(200).json(updatedDancer);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Controller to delete a dancer by ID
exports.deleteDancer = async (req, res) => {
    try {
        const deletedDancer = await Dancer.findByIdAndDelete(req.params.id);
        if (!deletedDancer) {
            return res.status(404).json({ message: 'Dancer not found' });
        }
        res.status(200).json({ message: 'Dancer deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
