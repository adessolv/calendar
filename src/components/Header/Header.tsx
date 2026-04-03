import React from 'react';
import styles from './Header.module.css';

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <span className={styles.logoIcon}>
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 10C5 10 9 14 12 14C15 14 19 10 19 10" stroke="#489980" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M5 14C5 14 9 18 12 18C15 18 19 14 19 14" stroke="#489980" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M5 6C5 6 9 10 12 10C15 10 19 6 19 6" stroke="#489980" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <h1>Calendar</h1>
      </div>
      <div className={styles.userProfile}>
        <span className={styles.userName}>Alex Dess</span>
        <div className={styles.avatar}></div>
      </div>
    </header>
  );
};

export default Header;
