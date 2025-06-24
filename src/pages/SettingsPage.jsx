import React from 'react';
import DownloadExcelComponent from '../components/DownloadExcelForm';
import Section from '../components/Section';
import PageHeader from '../components/PageHeader';

function SettingPage() {
  return (
    <Section>
      <PageHeader title="설정" />
      <DownloadExcelComponent />
    </Section>
  );
}

export default SettingPage;
