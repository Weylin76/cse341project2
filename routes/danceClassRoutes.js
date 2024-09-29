const express = require('express');
const router = express.Router();
const danceClassController = require('../controllers/danceClassController');

// GET all dance classes
router.get('/', danceClassController.getAllDanceClasses);

// GET a dance class by ID
router.get('/:id', danceClassController.getDanceClassById);

// POST (create) a new dance class
router.post('/', danceClassController.createDanceClass);

// PUT to update a dance class by ID
router.put('/:id', danceClassController.updateDanceClass);

// DELETE a dance class by ID
router.delete('/:id', danceClassController.deleteDanceClass);

module.exports = router;
