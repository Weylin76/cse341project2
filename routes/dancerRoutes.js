// routes/dancerRoutes.js
const express = require('express');
const router = express.Router();
const dancerController = require('../controllers/dancerController');

// GET all dancers
router.get('/', dancerController.getAllDancers);

// GET a dancer by ID
router.get('/:id', dancerController.getDancerById);

// POST a new dancer
router.post('/', dancerController.createDancer);

// PUT to update a dancer by ID
router.put('/:id', dancerController.updateDancer);

// DELETE a dancer by ID
router.delete('/:id', dancerController.deleteDancer);

module.exports = router;
