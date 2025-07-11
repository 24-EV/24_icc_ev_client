import React from 'react';
import legendStyles from '../styles/ChartLegendPanel.module.css';

function ChartLegend({ dataKeys, selected, onClick, onKeyDown, colors }) {
  return (
    <div className={legendStyles.legendPanel}>
      {dataKeys.map((key, idx) => {
        const isActive = selected.includes(key);
        return (
          <button
            key={key}
            className={[
              legendStyles.legendItem,
              isActive ? legendStyles.legendItemActive : legendStyles.legendItemInactive
            ].join(' ')}
            style={{
              color: isActive ? colors[idx % colors.length] || '#a259ec' : undefined
            }}
            tabIndex={0}
            aria-pressed={isActive}
            onClick={() => onClick(key)}
            onKeyDown={(e) => onKeyDown(key, e)}
          >
            {key}
          </button>
        );
      })}
    </div>
  );
}

export default ChartLegend;
