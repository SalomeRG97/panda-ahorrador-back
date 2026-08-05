const express = require('express');
const router = express.Router();
const incomeController = require('../controllers/income.controller');

router.get('/month/:monthId', (req, res, next) => incomeController.getByMonth(req, res, next));
router.post('/', (req, res, next) => incomeController.create(req, res, next));
router.put('/:id', (req, res, next) => incomeController.update(req, res, next));
router.delete('/:id', (req, res, next) => incomeController.delete(req, res, next));
router.post('/saving', (req, res, next) => incomeController.setSaving(req, res, next));

module.exports = router;
