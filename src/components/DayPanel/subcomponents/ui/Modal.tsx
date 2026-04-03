import React from 'react';
import styles from './Modal.module.css';

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ children, onClose }) => {
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div 
        className={styles.modalContent} 
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
