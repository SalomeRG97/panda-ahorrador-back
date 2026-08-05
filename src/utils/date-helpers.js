const MONTH_NAMES = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];

function getMonthName(monthNumber) {
  return MONTH_NAMES[monthNumber - 1] || '';
}

function getDaysInMonth(year, monthNumber) {
  return new Date(year, monthNumber, 0).getDate();
}

function calculateWeeksForMonth(year, monthNumber) {
  const days = getDaysInMonth(year, monthNumber);
  const weeks = [];
  let currentDay = 1;
  let weekNumber = 1;

  while (currentDay <= days) {
    const endDay = Math.min(currentDay + 6, days);
    const startDate = `${year}-${String(monthNumber).padStart(2, '0')}-${String(currentDay).padStart(2, '0')}`;
    const endDate = `${year}-${String(monthNumber).padStart(2, '0')}-${String(endDay).padStart(2, '0')}`;
    
    weeks.push({
      week_number: weekNumber,
      start_date: startDate,
      end_date: endDate
    });
    
    currentDay = endDay + 1;
    weekNumber++;
  }

  return weeks;
}

module.exports = {
  MONTH_NAMES,
  getMonthName,
  getDaysInMonth,
  calculateWeeksForMonth
};
