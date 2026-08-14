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
  const daysInMonth = getDaysInMonth(year, monthNumber);
  const weeks = [];
  let currentDay = 1;
  let weekNumber = 1;

  while (currentDay <= daysInMonth) {
    const dateObj = new Date(year, monthNumber - 1, currentDay);
    const dayOfWeek = dateObj.getDay(); // 0: Dom, 1: Lun, ..., 6: Sáb
    const daysUntilSaturday = 6 - dayOfWeek;
    const endDay = Math.min(currentDay + daysUntilSaturday, daysInMonth);

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
