import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useEventForm } from './useEventForm';
import type { CalendarEvent } from '../../../types';

describe('useEventForm', () => {
  const mockSelectedDate = '2026-04-03';
  const mockStartTime = '09:00';
  const mockEndTime = '10:00';

  it('initializes with default values when not editing', () => {
    const { result } = renderHook(() => 
      useEventForm(null, mockSelectedDate, mockStartTime, mockEndTime)
    );

    expect(result.current.formState.date).toBe(mockSelectedDate);
    expect(result.current.formState.title).toBe('');
    expect(result.current.error).toBeNull();
  });

  it('initializes with event data when editing', () => {
    const mockEvent: CalendarEvent = {
      id: '123',
      title: 'Existing Event',
      description: 'Some desc',
      date: '2026-05-01',
      time: '14:00 - 15:30',
      color: '#ff0000'
    };

    const { result } = renderHook(() => 
      useEventForm(mockEvent, mockSelectedDate, mockStartTime, mockEndTime)
    );

    expect(result.current.formState.title).toBe('Existing Event');
    expect(result.current.formState.startTime).toBe('14:00');
    expect(result.current.formState.endTime).toBe('15:30');
    expect(result.current.formState.color).toBe('#ff0000');
  });

  it('validates required title', () => {
    const { result } = renderHook(() => 
      useEventForm(null, mockSelectedDate, mockStartTime, mockEndTime)
    );

    act(() => {
      const isValid = result.current.validate();
      expect(isValid).toBe(false);
    });

    expect(result.current.error).toBe('Title is required to create an event.');
  });

  it('validates that end time is after start time', () => {
    const { result } = renderHook(() => 
      useEventForm(null, mockSelectedDate, mockStartTime, mockEndTime)
    );

    act(() => {
      result.current.updateField('title', 'Valid Title');
      result.current.updateField('startTime', '11:00');
      result.current.updateField('endTime', '10:00');
    });

    act(() => {
      const isValid = result.current.validate();
      expect(isValid).toBe(false);
    });

    expect(result.current.error).toBe('The meeting must end after it starts. Please adjust the times.');
  });

  it('passes validation with correct data', () => {
    const { result } = renderHook(() => 
      useEventForm(null, mockSelectedDate, mockStartTime, mockEndTime)
    );

    act(() => {
      result.current.updateField('title', 'Valid Title');
      result.current.updateField('startTime', '09:00');
      result.current.updateField('endTime', '10:00');
    });

    act(() => {
      const isValid = result.current.validate();
      expect(isValid).toBe(true);
    });

    expect(result.current.error).toBeNull();
  });
});
