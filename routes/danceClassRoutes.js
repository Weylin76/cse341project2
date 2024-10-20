const express = require('express');
const router = express.Router();
const danceClassController = require('../controllers/danceClassController');
const { validateDanceClass } = require('../middlewares/validators');
const { isLoggedIn } = require('../middlewares/authMiddleware');

// GET all dance classes
/** ChatGPT helps with swagger file
 * @swagger
 * /danceclasses:
 *   get:
 *     summary: Get all dance classes
 *     tags: [Dance Classes]
 *     responses:
 *       200:
 *         description: List of dance classes
 */
router.get('/', isLoggedIn,  danceClassController.getAllDanceClasses);

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
router.get('/:id', isLoggedIn,  danceClassController.getDanceClassById);

// POST (create) a new dance class with validation
/**
 * @swagger
 * /danceclasses:
 *   post:
 *     summary: Create a new dance class
 *     tags: [Dance Classes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:  # Correctly formatted
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Intro to Ballet"
 *               semester:
 *                 type: string
 *                 example: "Fall 2024"
 *               teacher:
 *                 type: string
 *                 example: "Krista Smith"
 *               teachingAssistant:
 *                 type: string
 *                 example: "Lori Brown"
 *               classLength:
 *                 type: integer
 *                 example: 90
 *               classType:
 *                 type: string
 *                 example: "Ballet"
 *               location:
 *                 type: string
 *                 example: "Studio A, Downtown Dance Academy"
 *               daysOfWeek:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["Monday", "Wednesday", "Friday"]
 *               dancers:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     firstName:
 *                       type: string
 *                       example: "Cocoa"
 *                     lastName:
 *                       type: string
 *                       example: "Douglas"
 *                     age:
 *                       type: integer
 *                       example: 10
 *     responses:
 *       201:
 *         description: Dance class created
 *       400:
 *         description: Invalid data format
 */
router.post('/', isLoggedIn,  validateDanceClass, danceClassController.createDanceClass);

// PUT to update a dance class by ID with validation
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
 *         application/json:  # Correctly formatted
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Advanced Ballet"
 *               semester:
 *                 type: string
 *                 example: "Spring 2025"
 *               teacher:
 *                 type: string
 *                 example: "Sarah Lee"
 *               teachingAssistant:
 *                 type: string
 *                 example: "Alex Brown"
 *               classLength:
 *                 type: integer
 *                 example: 120
 *               classType:
 *                 type: string
 *                 example: "Contemporary"
 *               location:
 *                 type: string
 *                 example: "Studio B, Uptown Dance Academy"
 *               daysOfWeek:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["Tuesday", "Thursday"]
 *               dancers:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     firstName:
 *                       type: string
 *                       example: "Ethan"
 *                     lastName:
 *                       type: string
 *                       example: "Douglas"
 *                     age:
 *                       type: integer
 *                       example: 17
 *     responses:
 *       200:
 *         description: Dance class updated
 *       400:
 *         description: Invalid data format
 *       404:
 *         description: Dance class not found
 */
router.put('/:id', isLoggedIn,  validateDanceClass, danceClassController.updateDanceClass);

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
router.delete('/:id', isLoggedIn,  danceClassController.deleteDanceClass);

module.exports = router;
