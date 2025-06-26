import React from 'react';
import Section from '../Section';
import styles from '../../styles/CommonLayout.module.css';

function PageLayout({
  header,
  dataCards,
  mainPanel,
  topRowClass = '',
  titleWrapClass = '',
  dataCardRowClass = '',
  panelRowClass = '',
  ...rest
}) {
  return (
    <Section {...rest}>
      <div className={topRowClass}>
        <div className={titleWrapClass}>{header}</div>
        <div className={dataCardRowClass}>
          {Array.isArray(dataCards)
            ? dataCards.map((card, idx) => <React.Fragment key={idx}>{card}</React.Fragment>)
            : dataCards}
        </div>
      </div>
      <div className={panelRowClass}>{mainPanel}</div>
    </Section>
  );
}

export default PageLayout;
