const db = require('../config/database');
const logger = require('../config/logger');

class WeekRepository {
  async getByMonthId(monthId) {
    logger.debug(`[WeekRepository] Obteniendo semanas para el mes ID: ${monthId}`);
    const [rows] = await db.query(
      'SELECT * FROM weeks WHERE month_id = ? ORDER BY week_number ASC',
      [monthId]
    );
    return rows;
  }

  async getById(id) {
    logger.debug(`[WeekRepository] Obteniendo semana ID: ${id}`);
    const [rows] = await db.query('SELECT * FROM weeks WHERE id = ?', [id]);
    return rows[0] || null;
  }

  async create(monthId, weekNumber, startDate, endDate) {
    logger.info(`[WeekRepository] Insertando semana ${weekNumber} para mes ID: ${monthId}`);
    const [result] = await db.query(
      'INSERT INTO weeks (month_id, week_number, start_date, end_date) VALUES (?, ?, ?, ?)',
      [monthId, weekNumber, startDate, endDate]
    );
    return result.insertId;
  }
}

module.exports = new WeekRepository();
