const db = require('../config/database');
const logger = require('../config/logger');

class YearRepository {
  async getAll() {
    logger.debug('[YearRepository] Obteniendo lista de años');
    const [rows] = await db.query('SELECT * FROM years ORDER BY year DESC');
    return rows;
  }

  async getById(id) {
    logger.debug(`[YearRepository] Obteniendo año por ID: ${id}`);
    const [rows] = await db.query('SELECT * FROM years WHERE id = ?', [id]);
    return rows[0] || null;
  }

  async create(year, startMonth, endMonth = 12) {
    logger.info(`[YearRepository] Insertando nuevo año: ${year} (Mes ${startMonth} a ${endMonth})`);
    const [result] = await db.query(
      'INSERT INTO years (year, start_month, end_month) VALUES (?, ?, ?)',
      [year, startMonth, endMonth]
    );
    return result.insertId;
  }

  async delete(id) {
    logger.info(`[YearRepository] Eliminando año ID: ${id}`);
    await db.query('DELETE FROM years WHERE id = ?', [id]);
    return true;
  }
}

module.exports = new YearRepository();
