const categoryService = require('../services/category.service');
const logger = require('../config/logger');

class CategoryController {
  async getAll(req, res, next) {
    try {
      logger.info('[CategoryController] GET /api/categories');
      const categories = await categoryService.getAllCategories();
      res.json({ success: true, data: categories });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new CategoryController();
