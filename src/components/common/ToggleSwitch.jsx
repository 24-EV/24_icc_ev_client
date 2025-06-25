import React from 'react';
import styles from '../../styles/ToggleSwitch.module.css';

export default function ToggleSwitch({ checked, onChange, label, ...props }) {
  return (
    <label className={styles.toggleSwitch}>
      {label && <span className={styles.toggleLabel}>{label}</span>}
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className={styles.toggleInput}
        {...props}
      />
      <span className={styles.toggleTrack} data-checked={checked}>
        <span className={styles.toggleThumb} data-checked={checked} />
      </span>
    </label>
  );
}
