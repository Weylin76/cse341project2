const { body, validationResult } = require('express-validator');

// Middleware to handle validation errors
const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

// Validation rules for dancers
const validateDancer = [
    body('firstName')
        .isString()
        .withMessage('First name must be a string')
        .matches(/^[A-Za-z]+$/)
        .withMessage('First name should only contain alphabetic characters'),
    body('lastName')
        .isString()
        .withMessage('Last name must be a string')
        .matches(/^[A-Za-z]+$/)
        .withMessage('Last name should only contain alphabetic characters'),
    body('age')
        .isInt({ min: 0 })
        .withMessage('Age must be a positive integer'),
    handleValidationErrors
];

// Validation rules for dance classes
const validateDanceClass = [
    body('name')
        .isString()
        .withMessage('Dance class name must be a string')
        .matches(/^[A-Za-z\s]+$/)
        .withMessage('Dance class name should only contain alphabetic characters'),
    body('semester')
        .isString()
        .withMessage('Semester must be a string'),
    body('teacher')
        .isString()
        .withMessage('Teacher name must be a string'),
    body('teachingAssistant')
        .optional()
        .isString()
        .withMessage('Teaching Assistant name must be a string'),
    body('classLength')
        .isInt({ min: 1 })
        .withMessage('Class length must be a positive integer'),
    body('classType')
        .isString()
        .withMessage('Class type must be a string'),
    body('location')
        .isString()
        .withMessage('Location must be a string'),
    body('daysOfWeek')
        .isArray()
        .withMessage('Days of the week must be an array of strings')
        .custom((days) => days.every(day => typeof day === 'string'))
        .withMessage('Each day must be a string'),
    body('dancers')
        .optional()
        .isArray()
        .withMessage('Dancers must be an array of objects')
        .custom(dancers => dancers.every(dancer => dancer.firstName && dancer.lastName && typeof dancer.age === 'number'))
        .withMessage('Each dancer must have a valid firstName, lastName, and age'),
    handleValidationErrors
];

module.exports = {
    validateDancer,  // Export validation for dancers
    validateDanceClass,  // Export validation for dance classes
};



