import React, { useEffect, useState } from 'react';
import { BottomNavigation, BottomNavigationAction, useMediaQuery } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { NAV_ITEMS } from '../../constants/bottomAppBarConfig';
import styles from '../../styles/layout/BottomAppBar.module.css';
import { useTheme } from '@mui/material/styles';

function BottomAppBar() {
  const [value, setValue] = useState(0);
  const [hoverIdx, setHoverIdx] = useState(-1); // 🔹 호버 중인 인덱스
  const navigate = useNavigate();
  const location = useLocation();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const idx = NAV_ITEMS.findIndex((item) => item.path === location.pathname);
    setValue(idx === -1 ? 0 : idx);
  }, [location.pathname]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    navigate(NAV_ITEMS[newValue].path);
  };

  return (
    <div className={styles.container}>
      <BottomNavigation
        value={value}
        onChange={handleChange}
        showLabels={false} // 기본은 숨김, 아래에서 개별 showLabel로 제어
        sx={{
          width: '100%',
          height: '100%',
          background: 'transparent',
          '.MuiBottomNavigationAction-root': {
            color: 'var(--color-text-light)',
            transition: 'color .15s ease',
            '&.Mui-selected': {
              color: 'var(--color-primary)'
            }
          },
          // 라벨 애니메이션을 더 부드럽게
          '.MuiBottomNavigationAction-label': {
            fontSize: 13,
            transition: 'opacity .18s ease, transform .18s ease'
          },
          '.MuiBottomNavigationAction-root:hover .MuiBottomNavigationAction-label': {
            // hover일 때 라벨이 보일 때의 전환감 보강 (실제 표시 여부는 showLabel로 결정)
            transform: 'translateY(0)'
          }
        }}
      >
        {NAV_ITEMS.map((item, idx) => {
          const hovered = !isMobile && hoverIdx === idx;
          const selected = value === idx;
          const forceShow = hovered || selected; // 🔹 호버이거나 선택이면 라벨 보이기

          return (
            <BottomNavigationAction
              key={item.label}
              label={item.label}
              icon={
                <item.icon
                  sx={{
                    width: isMobile ? 16 : 24,
                    height: isMobile ? 16 : 24,
                    padding: 0,
                    transition: 'transform .18s ease',
                    ...(hovered && !selected ? { transform: 'translateY(-1px)' } : null)
                  }}
                />
              }
              showLabel={forceShow}
              onMouseEnter={() => !isMobile && setHoverIdx(idx)}
              onMouseLeave={() => !isMobile && setHoverIdx(-1)}
              onFocus={() => !isMobile && setHoverIdx(idx)} // 키보드 포커스 접근성
              onBlur={() => !isMobile && setHoverIdx(-1)}
              sx={{
                // 선택/호버 상태에서 색감 강조 (선택 시에는 위의 .Mui-selected 규칙도 적용됨)
                ...(hovered && {
                  color: 'var(--color-primary)'
                })
              }}
            />
          );
        })}
      </BottomNavigation>
    </div>
  );
}

export default BottomAppBar;
