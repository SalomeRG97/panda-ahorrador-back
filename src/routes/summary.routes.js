const express = require('express');
const router = express.Router();
const summaryController = require('../controllers/summary.controller');

router.get('/year/:yearId', (req, res, next) => summaryController.getAnnualSummary(req, res, next));
router.get('/year/:yearId/categories', (req, res, next) => summaryController.getCategoryCharts(req, res, next));
router.get('/month/:monthId/categories-weekly', (req, res, next) => summaryController.getMonthWeeklyCategoryBreakdown(req, res, next));

module.exports = router;
