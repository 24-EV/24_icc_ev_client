import React from 'react';
import DownloadExcelForm from '../components/DownloadExcelForm';
import Section from '../components/Section';
import PageHeader from '../components/PageHeader';
import cardPanelStyles from '../styles/CardPanel.module.css';
import styles from '../styles/SettingsPage.module.css';
import useDarkMode from '../hooks/useDarkMode';
import ToggleSwitch from '../components/common/ToggleSwitch';

export default function SettingsPage() {
  return (
    <div style={{ color: '#bdbdbd', textAlign: 'center', marginTop: 40 }}>
      설정은 Drawer(오른쪽 메뉴)에서 확인하세요.
    </div>
  );
}
