import React from 'react';
import useDarkMode from '../../hooks/useDarkMode';
import ToggleSwitch from './ToggleSwitch';
import cardPanelStyles from '../../styles/CardPanel.module.css';
import styles from '../../styles/SettingsPage.module.css';

export default function DarkModeCard() {
  const [dark, toggleDark] = useDarkMode();
  return (
    <div className={cardPanelStyles.cardPanel + ' ' + styles.darkModeCard}>
      <span className={styles.darkModeLabel}>다크모드</span>
      <ToggleSwitch checked={dark} onChange={toggleDark} label="" />
    </div>
  );
}
