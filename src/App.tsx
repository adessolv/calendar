
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import CalendarGrid from './components/CalendarGrid/CalendarGrid';
import DayPanel from './components/DayPanel/DayPanel';
import { useCalendar } from './hooks/useCalendar';
import styles from './App.module.css';

function App() {
  const {
    currentDate,
    selectedDate,
    setSelectedDate,
    events,
    eventMap,
    nextYear,
    prevYear,
    selectMonth,
    addEvent,
    updateEvent,
    deleteEvent
  } = useCalendar();

  return (
    <div className={styles.appContainer}>
      <div className={styles.appWindow}>
        <Header />
        <div className={styles.mainContent}>
          <Sidebar 
            currentDate={currentDate} 
            nextYear={nextYear} 
            prevYear={prevYear} 
            selectMonth={selectMonth} 
            events={events}
            eventMap={eventMap}
          />
          <CalendarGrid 
            currentDate={currentDate} 
            selectedDate={selectedDate} 
            setSelectedDate={setSelectedDate} 
            events={events}
            eventMap={eventMap}
          />
          <DayPanel 
            selectedDate={selectedDate} 
            events={events}
            eventMap={eventMap}
            addEvent={addEvent}
            updateEvent={updateEvent}
            deleteEvent={deleteEvent}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
