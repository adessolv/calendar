import React from 'react';
import { Dayjs } from 'dayjs';
import styles from './CalendarGrid.module.css';
import { getDaysInMonth, WEEKDAY_NAMES } from '../../utils/date';
import type { CalendarEvent } from '../../types';

interface CalendarGridProps {
  currentDate: Dayjs;
  selectedDate: Dayjs;
  setSelectedDate: (date: Dayjs) => void;
  events: CalendarEvent[];
  eventMap: Record<string, CalendarEvent[]>;
}

const CalendarGrid: React.FC<CalendarGridProps> = ({ currentDate, selectedDate, setSelectedDate, eventMap }) => {
  const days = getDaysInMonth(currentDate.year(), currentDate.month());

  const getEventsForDate = (date: Dayjs) => {
    return eventMap[date.format('YYYY-MM-DD')] || [];
  };

  return (
    <div className={styles.gridContainer}>
      <header className={styles.gridHeader}>
        {WEEKDAY_NAMES.map(day => (
          <div key={day} className={styles.weekdayName}>{day}</div>
        ))}
      </header>
      <div className={styles.gridBody}>
        {days.map((day, index) => {
          const isCurrentMonth = day.month() === currentDate.month();
          const isSelected = day.isSame(selectedDate, 'day');
          const dayEvents = getEventsForDate(day);
          
          return (
            <div 
              key={index}
              className={`${styles.dayCell} ${!isCurrentMonth ? styles.otherMonth : ''} ${isSelected ? styles.selected : ''}`}
              onClick={() => setSelectedDate(day)}
            >
              <span className={styles.dayNumber}>{day.date()}</span>
              <div className={styles.dotsContainer}>
                {dayEvents.map(event => (
                  <span 
                    key={event.id} 
                    className={styles.eventDot} 
                    style={{ backgroundColor: event.color }}
                  ></span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarGrid;
