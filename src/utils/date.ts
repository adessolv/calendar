import dayjs, { Dayjs } from 'dayjs';

/**
 * Returns an array of Dayjs objects representing the calendar grid for a given year and month.
 * It always returns 42 days (6 weeks of 7 days) to ensure the grid is consistent.
 */
export const getDaysInMonth = (year: number, month: number): Dayjs[] => {
  const firstDayOfMonth = dayjs().year(year).month(month).startOf('month');
  const lastDayOfMonth = dayjs().year(year).month(month).endOf('month');

  const days: Dayjs[] = [];
  
  // Padding from previous month
  const startPadding = firstDayOfMonth.day(); // 0 is Sunday, 1 is Monday ...
  for (let i = startPadding; i > 0; i--) {
    days.push(firstDayOfMonth.subtract(i, 'day'));
  }

  // Days of current month
  for (let i = 1; i <= lastDayOfMonth.date(); i++) {
    days.push(firstDayOfMonth.date(i));
  }

  // Padding from next month
  const remainingCells = 42 - days.length; 
  for (let i = 1; i <= remainingCells; i++) {
    days.push(lastDayOfMonth.add(i, 'day'));
  }

  return days;
};

export const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export const WEEKDAY_NAMES = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
