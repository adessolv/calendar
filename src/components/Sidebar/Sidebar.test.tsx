import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import dayjs from 'dayjs';
import Sidebar from './Sidebar';

describe('Sidebar', () => {
  it('renders year and month list, and handles navigation', () => {
    const currentDate = dayjs('2026-04-15');
    const mockNextYear = vi.fn();
    const mockPrevYear = vi.fn();
    const mockSelectMonth = vi.fn();
    
    // Simulate events to check event counts
    const eventMap = {
      '2026-04-10': [{ id: '1', title: 'A', date: '2026-04-10', time: '10:00', color: '', description: '' }],
      '2026-05-15': [{ id: '2', title: 'B', date: '2026-05-15', time: '10:00', color: '', description: '' }, { id: '3', title: 'C', date: '2026-05-15', time: '12:00', color: '', description: '' }]
    };

    render(
      <Sidebar 
        currentDate={currentDate}
        nextYear={mockNextYear}
        prevYear={mockPrevYear}
        selectMonth={mockSelectMonth}
        events={[]}
        eventMap={eventMap}
      />
    );

    // Verify year is displayed
    expect(screen.getByText('2026')).toBeInTheDocument();

    // Verify event counts
    // April (4th month, index 3) should have 1 event. May (index 4) should have 2.
    // DOM structure is <li ...><span class="monthName">April</span><span class="eventCount">1</span></li>
    const aprilItem = screen.getByText('April').closest('li');
    expect(aprilItem).toHaveTextContent('1');

    const mayItem = screen.getByText('May').closest('li');
    expect(mayItem).toHaveTextContent('2');

    // Click next/prev year
    const buttons = screen.getAllByRole('button'); // [<, >]
    fireEvent.click(buttons[0]); // prev year
    expect(mockPrevYear).toHaveBeenCalled();
    
    fireEvent.click(buttons[1]); // next year
    expect(mockNextYear).toHaveBeenCalled();

    // Select month
    fireEvent.click(screen.getByText('May'));
    // May is index 4
    expect(mockSelectMonth).toHaveBeenCalledWith(4);
  });
});
