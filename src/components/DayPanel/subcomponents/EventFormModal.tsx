import React, { useEffect, useRef } from 'react';
import styles from './EventForm.module.css';
import type { CalendarEvent } from '../../../types';
import Modal from './ui/Modal';
import { FormField, FormTextarea, FormRow } from './ui/FormFields';
import { useEventForm } from './useEventForm';

interface EventFormModalProps {
  editingEvent: CalendarEvent | null;
  selectedDate: string; // YYYY-MM-DD
  initialStartTime?: string;
  initialEndTime?: string;
  onSave: (event: Omit<CalendarEvent, 'id'> | CalendarEvent) => void;
  onCancel: () => void;
}

const MAX_TITLE = 50;
const MAX_DESC = 300;

const EventFormModal: React.FC<EventFormModalProps> = ({ 
  editingEvent, 
  selectedDate,
  initialStartTime = '09:00',
  initialEndTime = '10:00',
  onSave, 
  onCancel 
}) => {
  const { formState, updateField, error, validate } = useEventForm(
    editingEvent, 
    selectedDate, 
    initialStartTime, 
    initialEndTime
  );

  const titleRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    titleRef.current?.focus();
    
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onCancel();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onCancel]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const eventData = { 
      title: formState.title.trim(), 
      description: formState.description.trim(), 
      date: formState.date, 
      time: `${formState.startTime} - ${formState.endTime}`, 
      color: formState.color 
    };

    if (editingEvent) {
      onSave({ ...editingEvent, ...eventData });
    } else {
      onSave(eventData);
    }
  };

  return (
    <Modal onClose={onCancel}>
      <form onSubmit={handleSubmit} noValidate>
        <div className={styles.formHeader}>
          <h3>{editingEvent ? 'Update Event Details' : 'Design Your New Event'}</h3>
        </div>
        
        {error && <div className={styles.errorBanner}>{error}</div>}

        <FormField 
          ref={titleRef}
          label="Title"
          charCount={`${formState.title.length}/${MAX_TITLE}`}
          value={formState.title}
          onChange={e => updateField('title', e.target.value.substring(0, MAX_TITLE))}
          placeholder="e.g. Brainstorming Session"
          required
        />

        <FormTextarea 
          label="Description (optional)"
          charCount={`${formState.description.length}/${MAX_DESC}`}
          value={formState.description}
          onChange={e => updateField('description', e.target.value.substring(0, MAX_DESC))}
          placeholder="Add context, links, or a brief agenda..."
          rows={3}
        />

        <FormField 
          label="Event Date"
          type="date"
          value={formState.date}
          onChange={e => updateField('date', e.target.value)}
          required
        />

        <FormRow>
          <FormField 
            label="Start Time"
            type="time"
            value={formState.startTime}
            onChange={e => updateField('startTime', e.target.value)}
            required
          />
          <FormField 
            label="End Time"
            type="time"
            value={formState.endTime}
            onChange={e => updateField('endTime', e.target.value)}
            required
          />
        </FormRow>

        <div className={styles.colorPickerGroup}>
          <label>Theme Color</label>
          <div className={styles.colorPickerWrapper}>
            <input 
              type="color" 
              value={formState.color} 
              onChange={e => updateField('color', e.target.value)} 
              className={styles.colorNode}
            />
            <span className={styles.colorHex}>{formState.color}</span>
          </div>
        </div>

        <div className={styles.formActions}>
          <button 
            type="button" 
            onClick={onCancel} 
            className={`${styles.btn} ${styles.discardBtn}`}
          >
            Discard
          </button>
          <button 
            type="submit" 
            className={`${styles.btn} ${styles.submitBtn}`}
          >
            {editingEvent ? 'Save Changes' : 'Create Event'}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default EventFormModal;
