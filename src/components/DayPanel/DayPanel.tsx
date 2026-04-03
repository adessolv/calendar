import { useState, useMemo } from 'react';
import { Dayjs } from 'dayjs';
import styles from './DayPanel.module.css';
import type { CalendarEvent } from '../../types';

import EventItem from './subcomponents/EventItem';
import EventFormModal from './subcomponents/EventFormModal';
import DeleteConfirmModal from './subcomponents/DeleteConfirmModal';

interface DayPanelProps {
  selectedDate: Dayjs;
  events: CalendarEvent[];
  eventMap: Record<string, CalendarEvent[]>;
  addEvent: (event: Omit<CalendarEvent, 'id'>) => void;
  updateEvent: (updatedEvent: CalendarEvent) => void;
  deleteEvent: (id: string) => void;
}

const DayPanel: React.FC<DayPanelProps> = ({ selectedDate, eventMap, addEvent, updateEvent, deleteEvent }) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<CalendarEvent | null>(null);
  const [activeDropdownId, setActiveDropdownId] = useState<string | null>(null);
  const [deletingEventId, setDeletingEventId] = useState<string | null>(null);

  const parseTime = (timeStr: string) => {
    const match = timeStr.match(/(\d{1,2})[:.]?(\d{2})?\s*(am|pm)?/i);
    if (!match) return 0;
    let hours = parseInt(match[1], 10);
    const minutes = match[2] ? parseInt(match[2], 10) : 0;
    const ampm = match[3] ? match[3].toLowerCase() : null;
    if (ampm === 'pm' && hours < 12) hours += 12;
    if (ampm === 'am' && hours === 12) hours = 0;
    return hours * 60 + minutes;
  };

  const dayEvents = useMemo(() => {
    const eventsForDay = eventMap[selectedDate.format('YYYY-MM-DD')] || [];
    return [...eventsForDay].sort((a, b) => parseTime(a.time) - parseTime(b.time));
  }, [eventMap, selectedDate]);
  
  const monthName = selectedDate.format('MMMM').toUpperCase();
  const dayNumber = selectedDate.format('D');
  const weekdayName = selectedDate.format('dddd').toUpperCase();

  const handleOpenAdd = () => {
    setEditingEvent(null);
    setIsFormOpen(true);
  };

  const handleOpenEdit = (event: CalendarEvent) => {
    setEditingEvent(event);
    setIsFormOpen(true);
    setActiveDropdownId(null);
  };

  const handleSaveEvent = (eventData: Omit<CalendarEvent, 'id'> | CalendarEvent) => {
    if ('id' in eventData) {
      updateEvent(eventData as CalendarEvent);
    } else {
      addEvent(eventData);
    }
    setIsFormOpen(false);
  };

  return (
    <aside className={styles.dayPanel}>
      <header className={styles.header}>
        <h2 className={styles.dateTitle}>
          <span className={styles.monthName}>{monthName}</span> {dayNumber}
        </h2>
        <h3 className={styles.weekdayTitle}>{weekdayName}</h3>
      </header>

      <div className={styles.eventsList}>
        {dayEvents.length > 0 ? (
          dayEvents.map(event => (
            <EventItem 
              key={event.id}
              event={event}
              isActive={activeDropdownId === event.id}
              onToggleDropdown={() => setActiveDropdownId(activeDropdownId === event.id ? null : event.id)}
              onEdit={handleOpenEdit}
              onDeleteInitiate={setDeletingEventId}
            />
          ))
        ) : (
          <div className={styles.emptyState}>
            <p className={styles.noEvents}>No activities planned for today.</p>
          </div>
        )}
      </div>

      <button 
        className={styles.addBtn} 
        onClick={handleOpenAdd}
        aria-label="Add new event"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 5V19M5 12H19" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {isFormOpen && (
        <EventFormModal 
          editingEvent={editingEvent}
          selectedDate={selectedDate.format('YYYY-MM-DD')}
          onSave={handleSaveEvent}
          onCancel={() => setIsFormOpen(false)}
        />
      )}

      {deletingEventId && (
        <DeleteConfirmModal 
          onConfirm={() => {
            deleteEvent(deletingEventId);
            setDeletingEventId(null);
            setActiveDropdownId(null);
          }}
          onCancel={() => setDeletingEventId(null)}
        />
      )}
    </aside>
  );
};

export default DayPanel;
