const db = require('../config/database');
const logger = require('../config/logger');

class ExpenseRepository {
  // --- GASTOS PRESUPUESTADOS ---
  async getBudgetExpensesByMonth(monthId) {
    logger.debug(`[ExpenseRepository] Buscando gastos presupuestados del mes ID ${monthId}`);
    const [rows] = await db.query(
      `SELECT be.*, c.name as category_name, c.color as category_color, c.icon as category_icon 
       FROM budget_expenses be 
       JOIN categories c ON be.category_id = c.id 
       WHERE be.month_id = ? 
       ORDER BY be.date ASC`,
      [monthId]
    );
    return rows;
  }

  async getBudgetExpensesByWeek(weekId) {
    logger.debug(`[ExpenseRepository] Buscando gastos presupuestados de la semana ID ${weekId}`);
    const [rows] = await db.query(
      `SELECT be.*, c.name as category_name, c.color as category_color, c.icon as category_icon 
       FROM budget_expenses be 
       JOIN categories c ON be.category_id = c.id 
       WHERE be.week_id = ? 
       ORDER BY be.date ASC`,
      [weekId]
    );
    return rows;
  }

  async createBudgetExpense({ month_id, week_id, category_id, date, concept, budget_amount, real_amount = 0, payment_method = '' }) {
    logger.info(`[ExpenseRepository] Creando gasto presupuestado en mes ID ${month_id}: ${concept} ($${budget_amount})`);
    const [result] = await db.query(
      `INSERT INTO budget_expenses (month_id, week_id, category_id, date, concept, budget_amount, real_amount, payment_method) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [month_id, week_id, category_id, date, concept, budget_amount, real_amount, payment_method]
    );
    return result.insertId;
  }

  async updateBudgetExpense(id, { category_id, date, concept, budget_amount, real_amount, week_id, payment_method }) {
    logger.info(`[ExpenseRepository] Actualizando gasto presupuestado ID ${id}`);
    await db.query(
      `UPDATE budget_expenses 
       SET category_id = ?, date = ?, concept = ?, budget_amount = ?, real_amount = ?, week_id = COALESCE(?, week_id), payment_method = COALESCE(?, payment_method) 
       WHERE id = ?`,
      [category_id, date, concept, budget_amount, real_amount, week_id, payment_method, id]
    );
    return true;
  }

  async deleteBudgetExpense(id) {
    logger.info(`[ExpenseRepository] Eliminando gasto presupuestado ID ${id}`);
    await db.query('DELETE FROM budget_expenses WHERE id = ?', [id]);
    return true;
  }

  // --- GASTOS EXTRA (NO PRESUPUESTADOS) ---
  async getExtraExpensesByMonth(monthId) {
    logger.debug(`[ExpenseRepository] Buscando gastos extra del mes ID ${monthId}`);
    const [rows] = await db.query(
      `SELECT ee.*, c.name as category_name, c.color as category_color, c.icon as category_icon 
       FROM extra_expenses ee 
       JOIN categories c ON ee.category_id = c.id 
       WHERE ee.month_id = ? 
       ORDER BY ee.date ASC`,
      [monthId]
    );
    return rows;
  }

  async getExtraExpensesByWeek(weekId) {
    logger.debug(`[ExpenseRepository] Buscando gastos extra de la semana ID ${weekId}`);
    const [rows] = await db.query(
      `SELECT ee.*, c.name as category_name, c.color as category_color, c.icon as category_icon 
       FROM extra_expenses ee 
       JOIN categories c ON ee.category_id = c.id 
       WHERE ee.week_id = ? 
       ORDER BY ee.date ASC`,
      [weekId]
    );
    return rows;
  }

  async createExtraExpense({ month_id, week_id, category_id, date, concept, amount, payment_method = '' }) {
    logger.info(`[ExpenseRepository] Creando gasto extra en mes ID ${month_id}: ${concept} ($${amount})`);
    const [result] = await db.query(
      `INSERT INTO extra_expenses (month_id, week_id, category_id, date, concept, amount, payment_method) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [month_id, week_id, category_id, date, concept, amount, payment_method]
    );
    return result.insertId;
  }

  async updateExtraExpense(id, { category_id, date, concept, amount, week_id, payment_method }) {
    logger.info(`[ExpenseRepository] Actualizando gasto extra ID ${id}`);
    await db.query(
      `UPDATE extra_expenses 
       SET category_id = ?, date = ?, concept = ?, amount = ?, week_id = COALESCE(?, week_id), payment_method = COALESCE(?, payment_method) 
       WHERE id = ?`,
      [category_id, date, concept, amount, week_id, payment_method, id]
    );
    return true;
  }

  async deleteExtraExpense(id) {
    logger.info(`[ExpenseRepository] Eliminando gasto extra ID ${id}`);
    await db.query('DELETE FROM extra_expenses WHERE id = ?', [id]);
    return true;
  }
}

module.exports = new ExpenseRepository();
