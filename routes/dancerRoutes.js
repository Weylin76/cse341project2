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
router.get('/', isLoggedIn, dancerController.getAllDancers);

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
router.get('/:id', isLoggedIn, dancerController.getDancerById);

// POST a new dancer with validation
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
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: "Katelyn"
 *               lastName:
 *                 type: string
 *                 example: "Douglas"
 *               age:
 *                 type: integer
 *                 example: 17
 *     responses:
 *       201:
 *         description: Dancer created successfully
 *       400:
 *         description: Invalid data format
 */
router.post('/', isLoggedIn,  validateDancer, dancerController.createDancer);

// PUT to update a dancer by ID with validation
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
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: "Kate"
 *               lastName:
 *                 type: string
 *                 example: "Douglas"
 *               age:
 *                 type: integer
 *                 example: 18
 *     responses:
 *       200:
 *         description: Dancer updated successfully
 *       400:
 *         description: Invalid data format
 *       404:
 *         description: Dancer not found
 */
router.put('/:id', isLoggedIn, validateDancer, dancerController.updateDancer);

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
router.delete('/:id', isLoggedIn,  dancerController.deleteDancer);

module.exports = router;
