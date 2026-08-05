const express = require('express');
const router = express.Router();
const monthController = require('../controllers/month.controller');

router.get('/year/:yearId', (req, res, next) => monthController.getByYear(req, res, next));
router.get('/:id', (req, res, next) => monthController.getDetails(req, res, next));

module.exports = router;
