import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import dayjs from 'dayjs';
import { useCalendar } from './useCalendar';
import { mockEvents } from '../mocks/events';

describe('useCalendar hook', () => {
  beforeEach(() => {
    localStorage.clear();
    // Use fake timers if we wanted to mock Date.now() for id generation
    // but the actual generated ID is fine as long as we know it's a string.
  });

  it('initializes with default values', () => {
    const defaultDate = dayjs('2023-01-01');
    const { result } = renderHook(() => useCalendar(defaultDate));

    expect(result.current.currentDate.format('YYYY-MM-DD')).toBe('2023-01-01');
    expect(result.current.selectedDate.format('YYYY-MM-DD')).toBe('2023-01-01');
    expect(result.current.events).toEqual(mockEvents);
  });

  it('loads events from localStorage if available', () => {
    const customEvents = [
      { id: '1', title: 'Test Event', date: '2023-01-02', time: '10:00 AM', color: '#ff0000' }
    ];
    localStorage.setItem('calendar_events_v1', JSON.stringify(customEvents));

    const { result } = renderHook(() => useCalendar());
    expect(result.current.events).toEqual(customEvents);
  });

  it('syncs new events to localStorage', () => {
    const { result } = renderHook(() => useCalendar(dayjs('2023-01-01')));

    act(() => {
      result.current.addEvent({
        title: 'New Event',
        date: '2023-01-01',
        time: '12:00 PM',
        color: '#00ff00',
        description: ''
      });
    });

    const savedJSON = localStorage.getItem('calendar_events_v1');
    expect(savedJSON).not.toBeNull();
    const saved = JSON.parse(savedJSON as string);
    // Should have mockEvents + 1 new event
    expect(saved.length).toBe(mockEvents.length + 1);
    expect(saved[saved.length - 1].title).toBe('New Event');
  });

  it('handles navigation correctly', () => {
    const startDate = dayjs('2023-06-15');
    const { result } = renderHook(() => useCalendar(startDate));

    act(() => { result.current.nextMonth(); });
    expect(result.current.currentDate.format('YYYY-MM')).toBe('2023-07');

    act(() => { result.current.prevMonth(); });
    expect(result.current.currentDate.format('YYYY-MM')).toBe('2023-06');

    act(() => { result.current.nextYear(); });
    expect(result.current.currentDate.format('YYYY')).toBe('2024');

    act(() => { result.current.prevYear(); });
    expect(result.current.currentDate.format('YYYY')).toBe('2023');

    act(() => { result.current.selectMonth(11); }); // December
    expect(result.current.currentDate.format('MM')).toBe('12');
  });

  it('handles event CRUD operations', () => {
    // Start with empty localStorage to avoid mockEvents taking over if we override them
    // wait, we can just use the default mockEvents
    const { result } = renderHook(() => useCalendar());
    const initialCount = result.current.events.length;

    // ADD
    act(() => {
      result.current.addEvent({
        title: 'CRUD Event',
        date: '2023-01-01',
        time: '12:00 PM',
        color: '#00ff00'
      });
    });
    expect(result.current.events.length).toBe(initialCount + 1);
    const addedEventId = result.current.events[result.current.events.length - 1].id;

    // UPDATE
    act(() => {
      result.current.updateEvent({
        id: addedEventId,
        title: 'Updated Event',
        date: '2023-01-01',
        time: '01:00 PM',
        color: '#0000ff'
      });
    });
    const updatedEvent = result.current.events.find(e => e.id === addedEventId);
    expect(updatedEvent?.title).toBe('Updated Event');

    // DELETE
    act(() => {
      result.current.deleteEvent(addedEventId);
    });
    expect(result.current.events.length).toBe(initialCount);
    expect(result.current.events.find(e => e.id === addedEventId)).toBeUndefined();
  });
});
