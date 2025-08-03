import React, { useEffect, useState } from 'react';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import {
  DirectionsCar,
  BatteryChargingFull,
  CarRepair,
  LocationOn,
  Settings
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { NAV_ITEMS } from '../../constants/bottomAppBarConfig';

function BottomAppBar() {
  const [value, setValue] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const idx = NAV_ITEMS.findIndex((item) => item.path === location.pathname);
    setValue(idx === -1 ? 0 : idx);
  }, [location.pathname]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    navigate(NAV_ITEMS[newValue].path);
  };

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        width: '100%',
        maxWidth: '100vw',
        boxSizing: 'border-box',
        padding: 0,
        overflowX: 'hidden',
        height: 56,
        background: 'var(--color-surface)',
        borderTop: '1px solid var(--color-border)',
        zIndex: 100
      }}
    >
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
            icon={<item.icon />}
            showLabel={value === idx}
          />
        ))}
      </BottomNavigation>
    </div>
  );
}

export default BottomAppBar;
