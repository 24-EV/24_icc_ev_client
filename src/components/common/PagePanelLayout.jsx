import React from 'react';
import DataCard from './DataCard';
import styles from '../../styles/PagePanel.module.css';

export default function PagePanel({ title, dataCards, children }) {
  return (
    <div className={styles.panelWrap}>
      <div className={styles.topRow}>
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.dataCardRow}>
          {dataCards?.map((d, i) => (
            <DataCard key={i} label={d.label} value={d.value} unit={d.unit} />
          ))}
        </div>
      </div>
      <div className={styles.contentRow}>{children}</div>
    </div>
  );
}
