import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import EventFormModal from './EventFormModal';

describe('EventFormModal', () => {
  const mockOnSave = vi.fn();
  const mockOnCancel = vi.fn();

  const defaultProps = {
    editingEvent: null,
    selectedDate: '2026-04-15',
    onSave: mockOnSave,
    onCancel: mockOnCancel
  };

  it('renders form and validates required fields', () => {
    render(<EventFormModal {...defaultProps} />);
    
    // Check title
    expect(screen.getByText('Design Your New Event')).toBeInTheDocument();
    
    // Submit without title
    fireEvent.click(screen.getByRole('button', { name: /create event/i }));
    
    // Should show error banner
    expect(screen.getByText(/Title is required/i)).toBeInTheDocument();
    expect(mockOnSave).not.toHaveBeenCalled();
  });

  it('submits correctly when valid', () => {
    render(<EventFormModal {...defaultProps} />);
    
    // Fill required title
    const titleInput = screen.getByLabelText(/Title/i);
    fireEvent.change(titleInput, { target: { value: 'My New Event' } });
    
    // Submit
    fireEvent.click(screen.getByRole('button', { name: /create event/i }));
    
    expect(mockOnSave).toHaveBeenCalled();
    const saveArg = mockOnSave.mock.calls[0][0];
    expect(saveArg.title).toBe('My New Event');
    expect(saveArg.date).toBe('2026-04-15');
  });

  it('populates data correctly when editing', () => {
    const editingEvent = {
      id: '123',
      title: 'Existing Event',
      date: '2026-04-10',
      time: '10:00 - 11:00',
      color: '#ff0000',
      description: 'Test description'
    };
    
    render(<EventFormModal {...defaultProps} editingEvent={editingEvent} />);
    
    expect(screen.getByText('Update Event Details')).toBeInTheDocument();
    
    const titleInput = screen.getByLabelText(/Title/i) as HTMLInputElement;
    expect(titleInput.value).toBe('Existing Event');
    
    const descInput = screen.getByLabelText(/Description/i) as HTMLTextAreaElement;
    expect(descInput.value).toBe('Test description');
    
    const dateInput = screen.getByLabelText(/Event Date/i) as HTMLInputElement;
    expect(dateInput.value).toBe('2026-04-10');
  });

  it('calls onCancel on discard click or escape key', () => {
    render(<EventFormModal {...defaultProps} />);
    
    fireEvent.click(screen.getByRole('button', { name: /discard/i }));
    expect(mockOnCancel).toHaveBeenCalledTimes(1);
    
    fireEvent.keyDown(window, { key: 'Escape', code: 'Escape' });
    expect(mockOnCancel).toHaveBeenCalledTimes(2);
  });
});
