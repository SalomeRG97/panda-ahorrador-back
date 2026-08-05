const express = require('express');
const router = express.Router();
const yearController = require('../controllers/year.controller');

router.get('/', (req, res, next) => yearController.getAll(req, res, next));
router.get('/:id', (req, res, next) => yearController.getById(req, res, next));
router.post('/', (req, res, next) => yearController.create(req, res, next));
router.delete('/:id', (req, res, next) => yearController.delete(req, res, next));

module.exports = router;
