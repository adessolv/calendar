import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import dayjs from 'dayjs';
import DayPanel from './DayPanel';

describe('DayPanel', () => {
  const mockAddEvent = vi.fn();
  const mockUpdateEvent = vi.fn();
  const mockDeleteEvent = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  const defaultProps = {
    selectedDate: dayjs('2023-10-15'),
    events: [],
    eventMap: {},
    addEvent: mockAddEvent,
    updateEvent: mockUpdateEvent,
    deleteEvent: mockDeleteEvent,
  };

  it('renders the selected date correctly', () => {
    render(<DayPanel {...defaultProps} />);
    expect(screen.getByText('OCTOBER')).toBeInTheDocument();
    expect(screen.getByText('15')).toBeInTheDocument();
    expect(screen.getByText('SUNDAY')).toBeInTheDocument();
  });

  it('shows empty state when no events exist for the day', () => {
    render(<DayPanel {...defaultProps} />);
    expect(screen.getByText('No activities planned for today.')).toBeInTheDocument();
  });

  it('renders events in chronological order', () => {
    const eventMap = {
      '2023-10-15': [
        { id: '1', title: 'Lunch', date: '2023-10-15', time: '1:00 PM', color: '#f00', description: '' },
        { id: '2', title: 'Breakfast', date: '2023-10-15', time: '9:00 AM', color: '#0f0', description: '' }
      ]
    };
    render(<DayPanel {...defaultProps} eventMap={eventMap} />);
    
    // They should be sorted: Breakfast then Lunch
    const items = screen.getAllByRole('heading', { level: 4 });
    expect(items[0]).toHaveTextContent('Breakfast');
    expect(items[1]).toHaveTextContent('Lunch');
  });

  it('opens add event modal when add button is clicked', () => {
    render(<DayPanel {...defaultProps} />);
    const addBtn = screen.getByLabelText('Add new event');
    fireEvent.click(addBtn);
    
    // Check for the "Create Event" button instead of "Save"
    expect(screen.getByRole('button', { name: /create event/i })).toBeInTheDocument();
  });
});
