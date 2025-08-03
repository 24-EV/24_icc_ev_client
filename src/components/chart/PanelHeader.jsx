import React from 'react';
import ToggleSwitch from '../common/ToggleSwitch';
import styles from '../../styles/chart/Chart.module.css';

function PanelHeader({ title, toggleChecked, onToggleChange, toggleSwitchLabel }) {
  return (
    <div className={styles.chartHeader}>
      <h2 className={styles.chartTitle}>{title}</h2>
      <div className={styles.buttonRow}>
        <ToggleSwitch checked={toggleChecked} onChange={onToggleChange} label={toggleSwitchLabel} />
      </div>
    </div>
  );
}

export default PanelHeader;
