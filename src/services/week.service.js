const weekRepository = require('../repositories/week.repository');
const expenseRepository = require('../repositories/expense.repository');
const categoryRepository = require('../repositories/category.repository');
const logger = require('../config/logger');

class WeekService {
  async getWeeksByMonth(monthId) {
    return await weekRepository.getByMonthId(monthId);
  }

  async getWeekDetail(weekId) {
    logger.info(`[WeekService] Obteniendo resumen completo de semana ID ${weekId}`);
    const week = await weekRepository.getById(weekId);
    if (!week) {
      throw { statusCode: 404, message: 'Semana no encontrada' };
    }

    const budgetExpenses = await expenseRepository.getBudgetExpensesByWeek(weekId);
    const extraExpenses = await expenseRepository.getExtraExpensesByWeek(weekId);
    const categories = await categoryRepository.getAll();

    // Calcular totales por categoría
    const categoryTotals = categories.map(cat => {
      const catBudget = budgetExpenses.filter(e => e.category_id === cat.id);
      const catExtra = extraExpenses.filter(e => e.category_id === cat.id);

      const totalBudget = catBudget.reduce((sum, e) => sum + parseFloat(e.budget_amount || 0), 0);
      const totalRealBudget = catBudget.reduce((sum, e) => sum + parseFloat(e.real_amount || 0), 0);
      const totalExtra = catExtra.reduce((sum, e) => sum + parseFloat(e.amount || 0), 0);
      const totalSpent = totalRealBudget + totalExtra;

      return {
        categoryId: cat.id,
        categoryName: cat.name,
        categoryColor: cat.color,
        categoryIcon: cat.icon,
        totalBudget,
        totalRealBudget,
        totalExtra,
        totalSpent
      };
    });

    return {
      week,
      budgetExpenses,
      extraExpenses,
      categoryTotals
    };
  }
}

module.exports = new WeekService();
