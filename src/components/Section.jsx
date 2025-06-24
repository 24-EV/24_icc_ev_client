import React from 'react';

function Section({ children, style }) {
  // 반응형 스타일 적용
  const baseStyle = {
    maxWidth: 520,
    margin: '0 auto',
    padding: 0,
    width: '100%',
    ...style,
  };
  // 모바일 대응
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 600;
  if (isMobile) {
    baseStyle.maxWidth = '100vw';
    baseStyle.padding = '0 2vw';
    baseStyle.gap = 16;
  }
  return <section style={baseStyle}>{children}</section>;
}

export default Section;
