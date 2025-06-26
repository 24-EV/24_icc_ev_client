import React from 'react';
import styles from '../../styles/ToggleSwitch.module.css';

function ToggleSwitch({ checked, onChange, label }) {
  return (
    <label className={styles.toggleLabel}>
      {label && <span className={styles.labelText}>{label}</span>}
      <input type="checkbox" className={styles.toggleInput} checked={checked} onChange={onChange} />
      <span className={styles.toggleTrack} data-checked={checked}>
        <span className={styles.toggleThumb} data-checked={checked} />
      </span>
    </label>
  );
}

export default ToggleSwitch;
