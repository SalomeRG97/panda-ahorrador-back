const expenseRepository = require('../repositories/expense.repository');
const weekRepository = require('../repositories/week.repository');
const logger = require('../config/logger');

class ExpenseService {
  async getBudgetExpensesByMonth(monthId) {
    return await expenseRepository.getBudgetExpensesByMonth(monthId);
  }

  async getExtraExpensesByMonth(monthId) {
    return await expenseRepository.getExtraExpensesByMonth(monthId);
  }

  async getWeekExpenses(weekId) {
    logger.info(`[ExpenseService] Obteniendo gastos para la semana ID ${weekId}`);
    const budgetExpenses = await expenseRepository.getBudgetExpensesByWeek(weekId);
    const extraExpenses = await expenseRepository.getExtraExpensesByWeek(weekId);
    return { budgetExpenses, extraExpenses };
  }

  async createBudgetExpense(expenseData) {
    const { month_id, category_id, date, concept, budget_amount } = expenseData;
    if (!month_id || !category_id || !date || !concept || budget_amount == null) {
      throw { statusCode: 400, message: 'Faltan campos obligatorios para el gasto presupuestado' };
    }

    let week_id = expenseData.week_id;
    if (!week_id) {
      week_id = await this._findWeekIdForDate(month_id, date);
    }

    return await expenseRepository.createBudgetExpense({
      ...expenseData,
      week_id
    });
  }

  async updateBudgetExpense(id, expenseData) {
    const { month_id, date } = expenseData;
    let week_id = expenseData.week_id;
    if (!week_id && month_id && date) {
      week_id = await this._findWeekIdForDate(month_id, date);
    }
    return await expenseRepository.updateBudgetExpense(id, { ...expenseData, week_id });
  }

  async deleteBudgetExpense(id) {
    return await expenseRepository.deleteBudgetExpense(id);
  }

  async createExtraExpense(expenseData) {
    const { month_id, category_id, date, concept, amount } = expenseData;
    if (!month_id || !category_id || !date || !concept || amount == null) {
      throw { statusCode: 400, message: 'Faltan campos obligatorios para el gasto extra' };
    }

    let week_id = expenseData.week_id;
    if (!week_id) {
      week_id = await this._findWeekIdForDate(month_id, date);
    }

    return await expenseRepository.createExtraExpense({
      ...expenseData,
      week_id
    });
  }

  async updateExtraExpense(id, expenseData) {
    const { month_id, date } = expenseData;
    let week_id = expenseData.week_id;
    if (!week_id && month_id && date) {
      week_id = await this._findWeekIdForDate(month_id, date);
    }
    return await expenseRepository.updateExtraExpense(id, { ...expenseData, week_id });
  }

  async deleteExtraExpense(id) {
    return await expenseRepository.deleteExtraExpense(id);
  }

  async _findWeekIdForDate(monthId, dateStr) {
    const weeks = await weekRepository.getByMonthId(monthId);
    const targetDate = new Date(dateStr);

    for (const w of weeks) {
      const start = new Date(w.start_date);
      const end = new Date(w.end_date);
      end.setHours(23, 59, 59);

      if (targetDate >= start && targetDate <= end) {
        return w.id;
      }
    }
    return weeks[0] ? weeks[0].id : null;
  }
}

module.exports = new ExpenseService();
