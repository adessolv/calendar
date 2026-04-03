import React from 'react';
import styles from './FormFields.module.css';

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  charCount?: string;
}

export const FormField = React.forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, charCount, id, ...props }, ref) => {
    const inputId = id || `input-${label.replace(/\s+/g, '-').toLowerCase()}`;
    return (
      <div className={styles.inputGroup}>
        <div className={styles.labelRow}>
          <label htmlFor={inputId}>{label}</label>
          {charCount && <span className={styles.charCount}>{charCount}</span>}
        </div>
        <input id={inputId} ref={ref} {...props} />
      </div>
    );
  }
);

interface FormTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  charCount?: string;
}

export const FormTextarea = React.forwardRef<HTMLTextAreaElement, FormTextareaProps>(
  ({ label, charCount, id, ...props }, ref) => {
    const textareaId = id || `textarea-${label.replace(/\s+/g, '-').toLowerCase()}`;
    return (
      <div className={styles.inputGroup}>
        <div className={styles.labelRow}>
          <label htmlFor={textareaId}>{label}</label>
          {charCount && <span className={styles.charCount}>{charCount}</span>}
        </div>
        <textarea id={textareaId} ref={ref} {...props} />
      </div>
    );
  }
);

export const FormRow = ({ children }: { children: React.ReactNode }) => (
  <div className={styles.formRow}>{children}</div>
);
