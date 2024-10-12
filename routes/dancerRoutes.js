const express = require('express');
const router = express.Router();
const dancerController = require('../controllers/dancerController');

// GET all dancers
/**
 * @swagger
 * /dancers:
 *   get:
 *     summary: Retrieve a list of all dancers
 *     tags: [Dancers]
 *     responses:
 *       200:
 *         description: Successfully retrieved the list of dancers.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Dancer'
 */
router.get('/', dancerController.getAllDancers);

// GET a dancer by ID
/**
 * @swagger
 * /dancers/{id}:
 *   get:
 *     summary: Retrieve a dancer by their ID
 *     tags: [Dancers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the dancer to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Dancer found successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Dancer'
 *       404:
 *         description: Dancer not found
 */
router.get('/:id', dancerController.getDancerById);

// POST a new dancer
/**
 * @swagger
 * /dancers:
 *   post:
 *     summary: Create a new dancer
 *     tags: [Dancers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Dancer'
 *     responses:
 *       201:
 *         description: Dancer created successfully
 */
router.post('/', dancerController.createDancer);

// PUT to update a dancer by ID
/**
 * @swagger
 * /dancers/{id}:
 *   put:
 *     summary: Update a dancer's details
 *     tags: [Dancers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the dancer to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Dancer'
 *     responses:
 *       200:
 *         description: Dancer updated successfully
 *       404:
 *         description: Dancer not found
 */
router.put('/:id', dancerController.updateDancer);

// DELETE a dancer by ID
/**
 * @swagger
 * /dancers/{id}:
 *   delete:
 *     summary: Delete a dancer by ID
 *     tags: [Dancers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the dancer to delete
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Dancer deleted successfully
 *       404:
 *         description: Dancer not found
 */
router.delete('/:id', dancerController.deleteDancer);

module.exports = router;
