import React from 'react';
import styles from './EventForm.module.css';
import Modal from './ui/Modal';

interface DeleteConfirmModalProps {
  onConfirm: () => void;
  onCancel: () => void;
}

const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({ onConfirm, onCancel }) => {
  return (
    <Modal onClose={onCancel}>
      <div className={styles.deleteDialog}>
        <h3>Delete Event?</h3>
        <p>This action cannot be undone. Are you sure you want to remove this event from your calendar?</p>
        <div className={styles.formActions}>
          <button 
            type="button" 
            onClick={onCancel} 
            className={`${styles.btn} ${styles.discardBtn}`}
          >
            Cancel
          </button>
          <button 
            type="button" 
            onClick={onConfirm} 
            className={`${styles.btn} ${styles.confirmDeleteBtn}`}
          >
            Confirm Delete
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteConfirmModal;
