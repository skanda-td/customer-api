const { body, validationResult } = require('express-validator');

// Rules for creating a customer (all required fields)
const createCustomerRules = [
    body('name')
        .trim() // Remove leading/trailing whitespace
        .notEmpty().withMessage('Name is required')
        .isLength({ max: 100 }).withMessage('Name must be under 100 characters'),
    body('email')
        .trim()
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Must be a valid email address')
        .normalizeEmail(), // Normalize email (e.g., convert to lowercase)
    body('phone')
        .optional() // Phone is optional, but if provided, it must be valid
        .trim()
        .isMobilePhone().withMessage('Must be a valid phone number'),
    body('city')
        .optional()
        .trim()
        .isLength({ max: 100 }).withMessage('City must be under 100 characters'),
];

// Rules for updating — all fields optional, but validated if present
const updateCustomerRules = [
    body('name')
        .optional()
        .trim()
        .notEmpty().withMessage('Name cannot be empty')
        .isLength({ max: 100 }).withMessage('Name must be under 100 characters'),
    body('email')
        .optional()
        .trim()
        .isEmail().withMessage('Must be a valid email address')
        .normalizeEmail(),

    body('phone')
        .optional()
        .trim()
        .isMobilePhone().withMessage('Must be a valid phone number'),

    body('city')
        .optional()
        .trim()
        .isLength({ max: 100 }).withMessage('City must be under 100 characters'),
];

// Middleware that reads validation results and sends 400 if any failed
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array().map(e => ({ field: e.path, message: e.msg })),
    });
  }
  next();
};

module.exports = { createCustomerRules, updateCustomerRules, validate };