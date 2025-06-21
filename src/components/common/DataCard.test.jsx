import React from 'react';
import { render, screen } from '@testing-library/react';
import DataCard from './DataCard';

describe('DataCard', () => {
  it('라벨, 값, 단위를 올바르게 렌더링한다', () => {
    render(<DataCard label="속력" value={123} unit="km/h" />);
    expect(screen.getByText('속력')).toBeInTheDocument();
    expect(screen.getByText('123 km/h')).toBeInTheDocument();
  });

  it('unit이 없을 때도 정상 렌더링', () => {
    render(<DataCard label="RTC Module" value="2024-01-01 12:00:00" />);
    expect(screen.getByText('RTC Module')).toBeInTheDocument();
    expect(screen.getByText('2024-01-01 12:00:00')).toBeInTheDocument();
  });

  it('스냅샷 테스트', () => {
    const { container } = render(<DataCard label="전압" value={12.3} unit="V" />);
    expect(container).toMatchSnapshot();
  });
});
