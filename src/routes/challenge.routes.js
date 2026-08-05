const express = require('express');
const router = express.Router();
const challengeController = require('../controllers/challenge.controller');

router.get('/', (req, res, next) => challengeController.getAll(req, res, next));
router.get('/month/:monthId', (req, res, next) => challengeController.getMonthChallenge(req, res, next));
router.put('/progress', (req, res, next) => challengeController.updateProgress(req, res, next));

module.exports = router;
