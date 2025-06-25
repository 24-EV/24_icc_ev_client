import React from 'react';
import DownloadExcelForm from '../components/DownloadExcelForm';
import Section from '../components/Section';
import PageHeader from '../components/PageHeader';
import cardPanelStyles from '../styles/CardPanel.module.css';
import useDarkMode from '../hooks/useDarkMode';

function SettingPage() {
  const [dark, toggleDark] = useDarkMode();

  return (
    <Section style={{ alignItems: 'flex-start' }}>
      <PageHeader title="설정" />
      {/* 다크모드 카드 */}
      <div
        className={cardPanelStyles.cardPanel}
        style={{
          maxWidth: 400,
          marginLeft: 0,
          marginRight: 'auto',
          marginBottom: 24,
          boxShadow: '0 2px 16px rgba(124,58,237,0.10)',
          borderRadius: 20,
          padding: '1.2rem 1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1.2rem',
        }}
      >
        <span style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--color-text)' }}>
          다크모드
        </span>
        <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', gap: 8 }}>
          <input
            type="checkbox"
            checked={dark}
            onChange={toggleDark}
            style={{ width: 0, height: 0, opacity: 0, position: 'absolute' }}
          />
          <span
            style={{
              width: 44,
              height: 24,
              borderRadius: 16,
              background: dark ? 'var(--color-primary-dark)' : 'var(--color-border)',
              position: 'relative',
              transition: 'background 0.2s',
              display: 'inline-block',
            }}
          >
            <span
              style={{
                position: 'absolute',
                left: dark ? 22 : 2,
                top: 2,
                width: 20,
                height: 20,
                borderRadius: '50%',
                background: '#fff',
                boxShadow: '0 1px 4px rgba(124,58,237,0.10)',
                transition: 'left 0.2s',
                display: 'block',
              }}
            />
          </span>
        </label>
      </div>
      {/* 다운로드 카드(겹침 없이 바로!) */}
      <DownloadExcelForm style={{ maxWidth: 400, marginLeft: 0, marginRight: 'auto' }} />
    </Section>
  );
}

export default SettingPage;
