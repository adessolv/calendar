import { useState, useMemo, useEffect } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { mockEvents as initialEvents } from '../mocks/events';
import type { CalendarEvent } from '../types';
import { groupEventsByDate } from '../utils/eventHelpers';

const STORAGE_KEY = 'calendar_events_v1';

export const useCalendar = (initialDate = dayjs()) => {
  const [currentDate, setCurrentDate] = useState<Dayjs>(initialDate); // Controls the calendar grid view
  const [selectedDate, setSelectedDate] = useState<Dayjs>(initialDate); // Controls the active selected day
  
  // Load initial events from localStorage or use defaults
  const [events, setEvents] = useState<CalendarEvent[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return initialEvents;
      }
    }
    return initialEvents;
  });

  // Sync events with localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
  }, [events]);

  // Memoized event map for O(1) lookup performance
  const eventMap = useMemo(() => groupEventsByDate(events), [events]);

  const nextMonth = () => setCurrentDate(currentDate.add(1, 'month'));
  const prevMonth = () => setCurrentDate(currentDate.subtract(1, 'month'));
  const nextYear = () => setCurrentDate(currentDate.add(1, 'year'));
  const prevYear = () => setCurrentDate(currentDate.subtract(1, 'year'));
  const selectMonth = (monthIndex: number) => setCurrentDate(currentDate.month(monthIndex));

  const addEvent = (event: Omit<CalendarEvent, 'id'>) => {
    const newEvent = { ...event, id: Date.now().toString() };
    setEvents([...events, newEvent]);
  };

  const updateEvent = (updatedEvent: CalendarEvent) => {
    setEvents(events.map(ev => ev.id === updatedEvent.id ? updatedEvent : ev));
  };

  const deleteEvent = (id: string) => {
    setEvents(events.filter(ev => ev.id !== id));
  };

  return {
    currentDate,
    selectedDate,
    setSelectedDate,
    events,
    eventMap,
    nextMonth,
    prevMonth,
    nextYear,
    prevYear,
    selectMonth,
    addEvent,
    updateEvent,
    deleteEvent
  };
};
