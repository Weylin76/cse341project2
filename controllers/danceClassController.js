const DanceClass = require('../models/danceClass'); // Make sure the model is correctly imported

// Controller to get all dance classes
exports.getAllDanceClasses = async (req, res) => {
    try {
        const classes = await DanceClass.find();
        res.status(200).json(classes);
    } catch (err) {
        res.status(500).json({ error: err.message });
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
        res.status(500).json({ error: err.message });
    }
};

// Controller to create a new dance class
exports.createDanceClass = async (req, res) => {
    try {
        const newDanceClass = new DanceClass(req.body);
        const savedClass = await newDanceClass.save();
        res.status(201).json(savedClass);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Controller to update a dance class by ID
exports.updateDanceClass = async (req, res) => {
    try {
        const updatedClass = await DanceClass.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedClass) {
            return res.status(404).json({ message: 'Dance class not found' });
        }
        res.status(200).json(updatedClass);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Controller to delete a dance class by ID
exports.deleteDanceClass = async (req, res) => {
    try {
        const deletedClass = await DanceClass.findByIdAndDelete(req.params.id);
        if (!deletedClass) {
            return res.status(404).json({ message: 'Dance class not found' });
        }
        res.status(200).json({ message: 'Dance class deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

