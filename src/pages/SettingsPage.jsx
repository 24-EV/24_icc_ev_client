import React from 'react';
import DownloadExcelForm from '../components/DownloadExcelForm';
import Section from '../components/Section';
import PageHeader from '../components/PageHeader';
import cardPanelStyles from '../styles/CardPanel.module.css';
import styles from '../styles/SettingsPage.module.css';
import useDarkMode from '../hooks/useDarkMode';

function SettingsPage() {
  const [dark, toggleDark] = useDarkMode();

  return (
    <Section>
      <PageHeader title="설정" />
      {/* 다크모드 카드 */}
      <div className={cardPanelStyles.cardPanel + ' ' + styles.darkModeCard}>
        <span className={styles.darkModeLabel}>다크모드</span>
        <label className={styles.toggleLabel}>
          <input
            type="checkbox"
            checked={dark}
            onChange={toggleDark}
            className={styles.toggleInput}
          />
          <span className={styles.toggleTrack}>
            <span className={styles.toggleThumb} data-dark={dark} />
          </span>
        </label>
      </div>
      {/* 다운로드 카드(겹침 없이 바로!) */}
      <div className={styles.downloadCardWrap}>
        <DownloadExcelForm />
      </div>
    </Section>
  );
}

export default SettingsPage;
