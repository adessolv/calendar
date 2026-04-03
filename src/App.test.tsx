import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from './App';

// We don't need to mock useCalendar entirely because we want an integration test
// But we might need to mock matchMedia if it's used, though it doesn't seem to be.

describe('App', () => {
  it('renders without crashing and displays main components', () => {
    render(<App />);

    // Logo text "Calendar" should be present in a heading
    expect(screen.getByRole('heading', { name: /calendar/i })).toBeInTheDocument();
    
    // Check if sidebar renders year
    const currentYear = new Date().getFullYear();
    expect(screen.getByText(new RegExp(currentYear.toString()))).toBeInTheDocument();
    
    // Check for specific text that is likely not broken up
    expect(screen.getByText(/Alex Dess/i)).toBeInTheDocument();
    expect(screen.getByText(/Alex Dess/i)).toBeInTheDocument();
  });
});
