import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import EventItem from './EventItem';
import type { CalendarEvent } from '../../../types';

const mockEvent: CalendarEvent = {
  id: '1',
  title: 'Test Event',
  date: '2026-04-03',
  time: '10:00 - 11:00',
  color: '#ff0000',
  description: 'Test Description'
};

describe('EventItem', () => {
  it('renders event details correctly', () => {
    render(
      <EventItem 
        event={mockEvent} 
        isActive={false} 
        onToggleDropdown={() => {}} 
        onEdit={() => {}} 
        onDeleteInitiate={() => {}} 
      />
    );

    expect(screen.getByText('Test Event')).toBeInTheDocument();
    expect(screen.getByText('10:00 - 11:00')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
  });

  it('calls onToggleDropdown when the "..." button is clicked', () => {
    const onToggleDropdown = vi.fn();
    render(
      <EventItem 
        event={mockEvent} 
        isActive={false} 
        onToggleDropdown={onToggleDropdown} 
        onEdit={() => {}} 
        onDeleteInitiate={() => {}} 
      />
    );

    const moreBtn = screen.getByLabelText('More options');
    fireEvent.click(moreBtn);

    expect(onToggleDropdown).toHaveBeenCalledTimes(1);
  });

  it('shows the dropdown and calls onEdit when "Edit Event" is clicked', () => {
    const onEdit = vi.fn();
    render(
      <EventItem 
        event={mockEvent} 
        isActive={true} 
        onToggleDropdown={() => {}} 
        onEdit={onEdit} 
        onDeleteInitiate={() => {}} 
      />
    );

    const editBtn = screen.getByText('Edit Event');
    fireEvent.click(editBtn);

    expect(onEdit).toHaveBeenCalledWith(mockEvent);
  });

  it('shows the dropdown and calls onDeleteInitiate when "Delete" is clicked', () => {
    const onDeleteInitiate = vi.fn();
    render(
      <EventItem 
        event={mockEvent} 
        isActive={true} 
        onToggleDropdown={() => {}} 
        onEdit={() => {}} 
        onDeleteInitiate={onDeleteInitiate} 
      />
    );

    const deleteBtn = screen.getByText('Delete');
    fireEvent.click(deleteBtn);

    expect(onDeleteInitiate).toHaveBeenCalledWith(mockEvent.id);
  });
});
