const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expense.controller');

// Gastos presupuestados
router.post('/budget', (req, res, next) => expenseController.createBudget(req, res, next));
router.put('/budget/:id', (req, res, next) => expenseController.updateBudget(req, res, next));
router.delete('/budget/:id', (req, res, next) => expenseController.deleteBudget(req, res, next));

// Gastos extra
router.post('/extra', (req, res, next) => expenseController.createExtra(req, res, next));
router.put('/extra/:id', (req, res, next) => expenseController.updateExtra(req, res, next));
router.delete('/extra/:id', (req, res, next) => expenseController.deleteExtra(req, res, next));

module.exports = router;
