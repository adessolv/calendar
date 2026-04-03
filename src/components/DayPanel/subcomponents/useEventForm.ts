import { useState, useEffect } from 'react';
import type { CalendarEvent } from '../../../types';

interface FormState {
  title: string;
  description: string;
  date: string;
  startTime: string;
  endTime: string;
  color: string;
}

export const useEventForm = (
  editingEvent: CalendarEvent | null,
  selectedDate: string,
  initialStartTime: string,
  initialEndTime: string
) => {
  const [formState, setFormState] = useState<FormState>({
    title: '',
    description: '',
    date: selectedDate,
    startTime: initialStartTime,
    endTime: initialEndTime,
    color: '#7B68EE'
  });

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (editingEvent) {
      const [start, end] = editingEvent.time.split(' - ');
      setFormState({
        title: editingEvent.title,
        description: editingEvent.description || '',
        date: editingEvent.date,
        startTime: start || initialStartTime,
        endTime: end || initialEndTime,
        color: editingEvent.color
      });
    } else {
      setFormState(prev => ({ ...prev, date: selectedDate }));
    }
  }, [editingEvent, selectedDate]);

  const updateField = (field: keyof FormState, value: string) => {
    setFormState(prev => ({ ...prev, [field]: value }));
  };

  const validate = () => {
    if (!formState.title.trim()) {
      setError('Title is required to create an event.');
      return false;
    }
    if (formState.startTime >= formState.endTime) {
      setError('The meeting must end after it starts. Please adjust the times.');
      return false;
    }
    setError(null);
    return true;
  };

  return {
    formState,
    updateField,
    error,
    setError,
    validate
  };
};
