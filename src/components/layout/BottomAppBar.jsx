import React, { useEffect, useState } from 'react';
import { BottomNavigation, BottomNavigationAction, useMediaQuery } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { NAV_ITEMS } from '../../constants/bottomAppBarConfig';
import styles from '../../styles/layout/BottomAppBar.module.css';
import { useTheme } from '@mui/material/styles';

function BottomAppBar() {
  const [value, setValue] = useState(0);
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
        showLabels={false}
        sx={{
          width: '100%',
          height: '100%',
          background: 'transparent',
          '.MuiBottomNavigationAction-root': {
            color: 'var(--color-text-light)',
            '&.Mui-selected': {
              color: 'var(--color-primary)'
            }
          },
          '.MuiBottomNavigationAction-label': {
            fontSize: 13,
            transition: 'all 0.2s'
          }
        }}
      >
        {NAV_ITEMS.map((item, idx) => (
          <BottomNavigationAction
            key={item.label}
            label={item.label}
            icon={
              <item.icon
                sx={{
                  width: isMobile ? 16 : 24,
                  height: isMobile ? 16 : 24,
                  padding: 0
                }}
              />
            }
            showLabel={value === idx}
          />
        ))}
      </BottomNavigation>
    </div>
  );
}

export default BottomAppBar;
