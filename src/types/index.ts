export interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  date: string; // YYYY-MM-DD
  time: string; // e.g. "09:00 - 15:30"
  color: string; // CSS color string or class name for the dot
}
