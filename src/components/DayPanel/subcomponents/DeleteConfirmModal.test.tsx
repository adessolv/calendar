import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import DeleteConfirmModal from './DeleteConfirmModal';

describe('DeleteConfirmModal', () => {
  it('renders confirmation text and handles buttons', () => {
    const mockOnConfirm = vi.fn();
    const mockOnCancel = vi.fn();

    render(
      <DeleteConfirmModal onConfirm={mockOnConfirm} onCancel={mockOnCancel} />
    );

    expect(screen.getByText('Delete Event?')).toBeInTheDocument();
    
    // Test cancel
    fireEvent.click(screen.getByRole('button', { name: /cancel/i }));
    expect(mockOnCancel).toHaveBeenCalled();
    
    // Test confirm
    fireEvent.click(screen.getByRole('button', { name: /confirm delete/i }));
    expect(mockOnConfirm).toHaveBeenCalled();
  });
});
