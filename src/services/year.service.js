const yearRepository = require('../repositories/year.repository');
const monthRepository = require('../repositories/month.repository');
const weekRepository = require('../repositories/week.repository');
const challengeRepository = require('../repositories/challenge.repository');
const { getMonthName, getDaysInMonth, calculateWeeksForMonth } = require('../utils/date-helpers');
const logger = require('../config/logger');

class YearService {
  async getAllYears() {
    logger.info('[YearService] Obteniendo todos los años registrados');
    return await yearRepository.getAll();
  }

  async getYearById(id) {
    logger.info(`[YearService] Buscando año por ID: ${id}`);
    const yearObj = await yearRepository.getById(id);
    if (!yearObj) {
      throw { statusCode: 404, message: 'Año no encontrado' };
    }
    const months = await monthRepository.getByYearId(id);
    return { ...yearObj, months };
  }

  async createYear(year, startMonth) {
    logger.info(`[YearService] Creando nuevo año ${year} iniciando en el mes ${startMonth}`);

    const existingYears = await yearRepository.getAll();
    if (existingYears.some(y => y.year === parseInt(year))) {
      throw { statusCode: 400, message: `El año ${year} ya ha sido creado previamente` };
    }

    const yearId = await yearRepository.create(year, startMonth, 12);
    const createdMonths = [];

    for (let m = parseInt(startMonth); m <= 12; m++) {
      const monthName = getMonthName(m);
      const monthId = await monthRepository.create(yearId, m, monthName);

      // Crear semanas
      const weeks = calculateWeeksForMonth(year, m);
      for (const w of weeks) {
        await weekRepository.create(monthId, w.week_number, w.start_date, w.end_date);
      }

      // Asignar reto aleatorio al mes
      const randomChallenge = await challengeRepository.getRandomChallenge();
      if (randomChallenge) {
        const monthChallengeId = await challengeRepository.assignChallengeToMonth(monthId, randomChallenge.id);
        const daysInMonth = getDaysInMonth(year, m);
        await challengeRepository.initializeProgress(monthChallengeId, daysInMonth);
      }

      createdMonths.push({ id: monthId, month_number: m, month_name: monthName });
    }

    logger.info(`[YearService] Año ${year} creado exitosamente con ${createdMonths.length} meses inicializados`);
    return { id: yearId, year, start_month: startMonth, end_month: 12, months: createdMonths };
  }

  async deleteYear(id) {
    logger.info(`[YearService] Eliminando año ID: ${id}`);
    return await yearRepository.delete(id);
  }
}

module.exports = new YearService();
