import { describe, it, expect } from 'vitest';
import { groupEventsByDate } from './eventHelpers';
import type { CalendarEvent } from '../types';

describe('groupEventsByDate', () => {
  it('groups events by their date string', () => {
    const events: CalendarEvent[] = [
      { id: '1', title: 'Event 1', date: '2026-04-01', time: '10:00 - 11:00', color: '#ff0000', description: '' },
      { id: '2', title: 'Event 2', date: '2026-04-01', time: '12:00 - 13:00', color: '#00ff00', description: '' },
      { id: '3', title: 'Event 3', date: '2026-04-02', time: '09:00 - 10:00', color: '#0000ff', description: '' },
    ];

    const grouped = groupEventsByDate(events);

    expect(Object.keys(grouped)).toHaveLength(2);
    expect(grouped['2026-04-01']).toHaveLength(2);
    expect(grouped['2026-04-02']).toHaveLength(1);
    expect(grouped['2026-04-01'][0].title).toBe('Event 1');
    expect(grouped['2026-04-02'][0].title).toBe('Event 3');
  });

  it('returns an empty object for an empty events array', () => {
    const grouped = groupEventsByDate([]);
    expect(grouped).toEqual({});
  });

  it('handles multiple events on the same day correctly', () => {
      const events: CalendarEvent[] = Array.from({ length: 10 }, (_, i) => ({
          id: i.toString(),
          title: `Event ${i}`,
          date: '2026-05-10',
          time: '10:00',
          color: '#000',
          description: ''
      }));

      const grouped = groupEventsByDate(events);
      expect(grouped['2026-05-10']).toHaveLength(10);
  });
});
