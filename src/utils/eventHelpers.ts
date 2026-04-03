import type { CalendarEvent } from '../types';

export const groupEventsByDate = (events: CalendarEvent[]): Record<string, CalendarEvent[]> => {
  return events.reduce((acc, event) => {
    const { date } = event;
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(event);
    return acc;
  }, {} as Record<string, CalendarEvent[]>);
};
