import React from 'react';
import styles from '../styles/Section.module.css';

function Section({ children }) {
  return <section className={styles.section + ' section-flex'}>{children}</section>;
}

export default Section;
