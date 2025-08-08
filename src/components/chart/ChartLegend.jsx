import React, { useCallback } from 'react';
import useDarkMode from '../../hooks/useDarkMode';
import legendStyles from '../../styles/chart/ChartLegendPanel.module.css';

function ChartLegend({ dataKeys = [], selected = [], onToggle }) {
  const [isDark] = useDarkMode();
  const axisTextColor = isDark ? '#f3f0ff' : '#181825';
  const inactiveColor = isDark ? 'rgba(200,200,200,0.6)' : 'rgba(90,90,90,0.7)';

  const handleKeyDown = useCallback(
    (key, e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onToggle?.(key);
      }
    },
    [onToggle]
  );

  return (
    <ul className={legendStyles.legendList} role="list" aria-label="차트 시리즈 토글">
      {dataKeys.map((key) => {
        const active = selected.includes(key);
        return (
          <li key={key} className={legendStyles.legendItemLi} role="listitem">
            <button
              type="button"
              className={legendStyles.itemButton}
              data-active={active ? 'true' : 'false'}
              aria-pressed={active}
              // ✅ 마우스 클릭 시 focus 생기는 것 자체를 막음 (키보드 탭은 정상 동작)
              onMouseDown={(e) => e.preventDefault()}
              onClick={(e) => {
                onToggle?.(key);
                e.currentTarget.blur(); // 혹시 생긴 포커스 제거
              }}
              onKeyDown={(e) => handleKeyDown(key, e)}
              style={{ color: active ? axisTextColor : inactiveColor }}
              title={active ? `${key} 숨기기` : `${key} 보이기`}
            >
              <span className={legendStyles.itemLabel}>{key}</span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}

export default ChartLegend;
