import React from 'react';
import Section from '../common/Section';
import pageLayoutStyles from '../../styles/layout/PageLayout.module.css';
import DataCard from '../common/DataCard';

function PageLayout({ header, data, mainPanel }) {
  return (
    <Section>
      <DataCards header={header} data={data} />
      <MainPanel mainPanel={mainPanel} />
    </Section>
  );
}

export function DataCards({ header = '', data }) {
  return (
    <div className={pageLayoutStyles.topRow}>
      <div className={pageLayoutStyles.titleWrap}>{header}</div>
      <div className={pageLayoutStyles.dataCardRow}>
        {Object.entries(data || {}).map(([key, { label, value, unit }]) => (
          <DataCard key={key} label={label} value={value} unit={unit} />
        ))}
      </div>
    </div>
  );
}

export function MainPanel({ mainPanel }) {
  return <div className={pageLayoutStyles.panelRow}>{mainPanel}</div>;
}

export default PageLayout;
