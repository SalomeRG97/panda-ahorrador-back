const express = require('express');
const router = express.Router();
const weekController = require('../controllers/week.controller');

router.get('/month/:monthId', (req, res, next) => weekController.getByMonth(req, res, next));
router.get('/:id', (req, res, next) => weekController.getDetail(req, res, next));

module.exports = router;
