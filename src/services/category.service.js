const categoryRepository = require('../repositories/category.repository');
const logger = require('../config/logger');

class CategoryService {
  async getAllCategories() {
    logger.info('[CategoryService] Procesando solicitud de lista de categorías');
    return await categoryRepository.getAll();
  }
}

module.exports = new CategoryService();
