import React from 'react';
import styles from './EventItem.module.css';
import type { CalendarEvent } from '../../../types';

interface EventItemProps {
  event: CalendarEvent;
  isActive: boolean;
  onToggleDropdown: () => void;
  onEdit: (event: CalendarEvent) => void;
  onDeleteInitiate: (id: string) => void;
}

const EventItem: React.FC<EventItemProps> = ({ 
  event, 
  isActive, 
  onToggleDropdown, 
  onEdit, 
  onDeleteInitiate 
}) => {
  return (
    <div className={`${styles.eventItem} ${isActive ? styles.itemActive : ''}`}>
      <div className={styles.eventDot} style={{ backgroundColor: event.color }}></div>
      <div className={styles.eventDetails}>
        <h4 className={styles.eventTitle}>{event.title}</h4>
        {event.description && <p className={styles.eventDesc}>{event.description}</p>}
        <p className={styles.eventTime}>{event.time}</p>
      </div>
      <div className={styles.moreContainer}>
        <button 
          className={styles.moreBtn}
          onClick={(e) => {
            e.stopPropagation();
            onToggleDropdown();
          }}
          aria-label="More options"
        >
          ...
        </button>
        
        {isActive && (
          <div className={styles.dropdown}>
            <button onClick={() => onEdit(event)}>Edit Event</button>
            <button 
              onClick={() => onDeleteInitiate(event.id)} 
              className={styles.deleteBtn}
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default React.memo(EventItem);
