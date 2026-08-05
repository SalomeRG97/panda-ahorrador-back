const db = require('../config/database');
const logger = require('../config/logger');

class CategoryRepository {
  async getAll() {
    logger.debug('[CategoryRepository] Obteniendo todas las categorías');
    const [rows] = await db.query('SELECT * FROM categories ORDER BY id ASC');
    return rows;
  }
}

module.exports = new CategoryRepository();
