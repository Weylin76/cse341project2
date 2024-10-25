const express = require('express');
const router = express.Router();
const dancerController = require('../controllers/dancerController'); 
const { validateDancer } = require('../middlewares/validators');
const { isLoggedIn } = require('../middlewares/authMiddleware');     

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
router.get('/', (req, res, next) => {
    dancerController.getAllDancers(req, res, next);
});

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
router.get('/:id', (req, res, next) => {
    dancerController.getDancerById(req, res, next);
});

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
 *       400:
 *         description: Invalid data format
 */
router.post('/', validateDancer, (req, res, next) => {
    dancerController.createDancer(req, res, next);
});

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
 *       400:
 *         description: Invalid data format
 *       404:
 *         description: Dancer not found
 */
router.put('/:id', validateDancer, (req, res, next) => {
    dancerController.updateDancer(req, res, next);
});

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
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Dancer deleted successfully
 *       404:
 *         description: Dancer not found
 */
router.delete('/:id', (req, res, next) => {
    dancerController.deleteDancer(req, res, next);
});

module.exports = router;
