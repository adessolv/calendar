import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import dayjs from 'dayjs';
import CalendarGrid from './CalendarGrid';

describe('CalendarGrid', () => {
  it('renders days of the month and handles selection', () => {
    const currentDate = dayjs('2026-04-15');
    const selectedDate = dayjs('2026-04-10');
    const setSelectedDate = vi.fn();

    const eventMap = {
      '2026-04-12': [{ id: '1', title: 'Test Event', date: '2026-04-12', time: '10:00', color: '#f00', description: '' }]
    };

    render(
      <CalendarGrid 
        currentDate={currentDate} 
        selectedDate={selectedDate} 
        setSelectedDate={setSelectedDate} 
        events={[]} 
        eventMap={eventMap} 
      />
    );

    // Verify weekday headers are present
    expect(screen.getByText('SUN')).toBeInTheDocument();
    
    // Wait, the dom has day number elements inside `.dayCell > .dayNumber`.
    // It's safer to check clicking
    
    // Find the 15th (which isn't selected)
    const day15 = screen.getAllByText('15')[0];
    fireEvent.click(day15);
    
    // Since 15 is clicked, setSelectedDate should be called
    expect(setSelectedDate).toHaveBeenCalled();
    const calledWithDate = setSelectedDate.mock.calls[0][0];
    expect(calledWithDate.date()).toBe(15);
    expect(calledWithDate.month()).toBe(3); // April is index 3
  });
});
