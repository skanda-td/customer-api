const express = require('express');
const router  = express.Router();

const {
  getAllCustomers,
  getCustomerById,
  createCustomer,
  updateCustomer,
  deleteCustomer,
} = require('../controller/customerController');

const {
  createCustomerRules,
  updateCustomerRules,
  validate,
} = require('../validator/customerValidator');

// Validation middleware runs BEFORE the controller on write operations
router.get('/',     getAllCustomers);
router.get('/:id',  getCustomerById);
router.post('/',    createCustomerRules, validate, createCustomer);
router.put('/:id',  updateCustomerRules, validate, updateCustomer);
// router.delete('/:id', deleteCustomer);

module.exports = router;