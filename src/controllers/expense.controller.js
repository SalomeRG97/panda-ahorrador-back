const expenseService = require('../services/expense.service');
const logger = require('../config/logger');

class ExpenseController {
  // GASTOS PRESUPUESTADOS
  async createBudget(req, res, next) {
    try {
      logger.info('[ExpenseController] POST /api/expenses/budget');
      const id = await expenseService.createBudgetExpense(req.body);
      res.status(201).json({ success: true, data: { id, ...req.body } });
    } catch (error) {
      next(error);
    }
  }

  async updateBudget(req, res, next) {
    try {
      const { id } = req.params;
      logger.info(`[ExpenseController] PUT /api/expenses/budget/${id}`);
      await expenseService.updateBudgetExpense(id, req.body);
      res.json({ success: true, message: 'Gasto presupuestado actualizado' });
    } catch (error) {
      next(error);
    }
  }

  async deleteBudget(req, res, next) {
    try {
      const { id } = req.params;
      logger.info(`[ExpenseController] DELETE /api/expenses/budget/${id}`);
      await expenseService.deleteBudgetExpense(id);
      res.json({ success: true, message: 'Gasto presupuestado eliminado' });
    } catch (error) {
      next(error);
    }
  }

  // GASTOS EXTRA
  async createExtra(req, res, next) {
    try {
      logger.info('[ExpenseController] POST /api/expenses/extra');
      const id = await expenseService.createExtraExpense(req.body);
      res.status(201).json({ success: true, data: { id, ...req.body } });
    } catch (error) {
      next(error);
    }
  }

  async updateExtra(req, res, next) {
    try {
      const { id } = req.params;
      logger.info(`[ExpenseController] PUT /api/expenses/extra/${id}`);
      await expenseService.updateExtraExpense(id, req.body);
      res.json({ success: true, message: 'Gasto extra actualizado' });
    } catch (error) {
      next(error);
    }
  }

  async deleteExtra(req, res, next) {
    try {
      const { id } = req.params;
      logger.info(`[ExpenseController] DELETE /api/expenses/extra/${id}`);
      await expenseService.deleteExtraExpense(id);
      res.json({ success: true, message: 'Gasto extra eliminado' });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ExpenseController();
