const express = require('express');
const router = express.Router();
const danceClassController = require('../controllers/danceClassController');

// GET all dance classes
/**
 * @swagger
 * /danceclasses:
 *   get:
 *     summary: Get all dance classes
 *     tags: [Dance Classes]
 *     responses:
 *       200:
 *         description: List of dance classes
 */
router.get('/', danceClassController.getAllDanceClasses);

// GET a dance class by ID
/**
 * @swagger
 * /danceclasses/{id}:
 *   get:
 *     summary: Get a dance class by ID
 *     tags: [Dance Classes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Dance class details
 *       404:
 *         description: Dance class not found
 */
router.get('/:id', danceClassController.getDanceClassById);

// POST (create) a new dance class
/**
 * @swagger
 * /danceclasses:
 *   post:
 *     summary: Create a new dance class
 *     tags: [Dance Classes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DanceClass'
 *     responses:
 *       201:
 *         description: Dance class created
 */
router.post('/', danceClassController.createDanceClass);

// PUT to update a dance class by ID
/**
 * @swagger
 * /danceclasses/{id}:
 *   put:
 *     summary: Update a dance class
 *     tags: [Dance Classes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DanceClass'
 *     responses:
 *       200:
 *         description: Dance class updated
 *       404:
 *         description: Dance class not found
 */
router.put('/:id', danceClassController.updateDanceClass);

// DELETE a dance class by ID
/**
 * @swagger
 * /danceclasses/{id}:
 *   delete:
 *     summary: Delete a dance class
 *     tags: [Dance Classes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Dance class deleted
 *       404:
 *         description: Dance class not found
 */
router.delete('/:id', danceClassController.deleteDanceClass);

module.exports = router;

