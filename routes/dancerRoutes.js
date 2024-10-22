const express = require('express');
const router = express.Router();
const dancerController = require('../controllers/dancerController'); 
const { validateDancer } = require('../middlewares/validators');
const { isLoggedIn } = require('../middlewares/authMiddleware');     

// Ensure all controller methods are correctly loaded
console.log('Loaded dancerController:', dancerController);

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
router.get('/', isLoggedIn, (req, res, next) => {
    console.log('GET /dancers');
    if (!dancerController.getAllDancers) {
        console.error('Error: getAllDancers method is undefined.');
        return res.status(500).send('Internal Server Error. Method not found.');
    }
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
router.get('/:id', isLoggedIn, (req, res, next) => {
    console.log('GET /dancers/:id');
    if (!dancerController.getDancerById) {
        console.error('Error: getDancerById method is undefined.');
        return res.status(500).send('Internal Server Error. Method not found.');
    }
    dancerController.getDancerById(req, res, next);
});

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
router.post('/', isLoggedIn, validateDancer, (req, res, next) => {
    console.log('POST /dancers');
    if (!dancerController.createDancer) {
        console.error('Error: createDancer method is undefined.');
        return res.status(500).send('Internal Server Error. Method not found.');
    }
    dancerController.createDancer(req, res, next);
});

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
router.put('/:id', isLoggedIn, validateDancer, (req, res, next) => {
    console.log('PUT /dancers/:id');
    if (!dancerController.updateDancer) {
        console.error('Error: updateDancer method is undefined.');
        return res.status(500).send('Internal Server Error. Method not found.');
    }
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
 *         description: The ID of the dancer to delete
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Dancer deleted successfully
 *       404:
 *         description: Dancer not found
 */
router.delete('/:id', isLoggedIn, (req, res, next) => {
    console.log('DELETE /dancers/:id');
    if (!dancerController.deleteDancer) {
        console.error('Error: deleteDancer method is undefined.');
        return res.status(500).send('Internal Server Error. Method not found.');
    }
    dancerController.deleteDancer(req, res, next);
});

module.exports = router;
