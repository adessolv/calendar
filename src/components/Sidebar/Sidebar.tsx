import React, { useMemo } from 'react';
import { Dayjs } from 'dayjs';
import styles from './Sidebar.module.css';
import { MONTH_NAMES } from '../../utils/date';
import type { CalendarEvent } from '../../types';

interface SidebarProps {
  currentDate: Dayjs;
  nextYear: () => void;
  prevYear: () => void;
  selectMonth: (monthIndex: number) => void;
  events: CalendarEvent[];
  eventMap: Record<string, CalendarEvent[]>;
}

const Sidebar: React.FC<SidebarProps> = ({ currentDate, nextYear, prevYear, selectMonth, eventMap }) => {
  const currentYear = currentDate.year();
  const currentMonthIndex = currentDate.month();

  // Pre-calculate event counts per month for the current year efficiently
  const eventCounts = useMemo(() => {
    const counts = new Array(12).fill(0);
    
    // We only need to iterate over the keys in the map
    Object.keys(eventMap).forEach(dateStr => {
      if (dateStr.startsWith(String(currentYear))) {
        const month = parseInt(dateStr.split('-')[1], 10) - 1;
        if (month >= 0 && month < 12) {
          counts[month] += eventMap[dateStr].length;
        }
      }
    });
    
    return counts;
  }, [eventMap, currentYear]);

  return (
    <aside className={styles.sidebar}>
      <div className={styles.yearControl}>
        <button className={styles.arrowBtn} onClick={prevYear}>&lt;</button>
        <span className={styles.year}>{currentYear}</span>
        <button className={styles.arrowBtn} onClick={nextYear}>&gt;</button>
      </div>
      <ul className={styles.monthList}>
        {MONTH_NAMES.map((month, index) => {
          const isActive = index === currentMonthIndex;
          const eventCount = eventCounts[index];
          return (
             <li
              key={month}
              className={`${styles.monthItem} ${isActive ? styles.active : ''}`}
              onClick={() => selectMonth(index)}
             >
               <span className={styles.monthName}>{month}</span>
               {eventCount > 0 && <span className={styles.eventCount}>{eventCount}</span>}
             </li>
          );
        })}
      </ul>
    </aside>
  );
};

export default Sidebar;
