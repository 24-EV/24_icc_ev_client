import React, { useEffect, useState } from 'react';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import BatteryChargingFullIcon from '@mui/icons-material/BatteryChargingFull';
import CarRepairIcon from '@mui/icons-material/CarRepair';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SettingsIcon from '@mui/icons-material/Settings';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from '../styles/BottomAppBar.module.css';

const navItems = [
  { icon: <DirectionsCarIcon />, path: '/vehicle', label: '차량' },
  { icon: <BatteryChargingFullIcon />, path: '/hv', label: 'HV' },
  { icon: <CarRepairIcon />, path: '/motor', label: '모터' },
  { icon: <LocationOnIcon />, path: '/gps', label: 'GPS' },
  { icon: <SettingsIcon />, path: '/settings', label: '설정' },
];

function BottomAppBar() {
  const [value, setValue] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const idx = navItems.findIndex((item) => location.pathname.startsWith(item.path));
    setValue(idx === -1 ? 0 : idx);
  }, [location.pathname]);

  useEffect(() => {
    const observer = () => setIsDark(document.body.classList.contains('dark'));
    observer();
    window.addEventListener('storage', observer);
    return () => window.removeEventListener('storage', observer);
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    navigate(navItems[newValue].path);
  };

  // 다크모드 색상 강제 적용
  const barStyle = isDark
    ? {
        background: 'var(--color-surface)',
        borderTop: '1px solid var(--color-border)',
      }
    : {};

  return (
    <div className={styles.bottomAppBar} style={barStyle}>
      <BottomNavigation
        value={value}
        onChange={handleChange}
        showLabels
        className={styles.muiBottomNavigation}
        sx={
          isDark
            ? {
                background: 'var(--color-surface)',
                borderTop: '1px solid var(--color-border)',
                boxShadow: 'none',
                border: 'none',
              }
            : {
                background: 'transparent',
                boxShadow: 'none',
                border: 'none',
              }
        }
      >
        {navItems.map((item, idx) => (
          <BottomNavigationAction
            key={item.path}
            icon={item.icon}
            aria-label={item.label}
            className={styles.iconButton}
            sx={{ minWidth: 0, padding: 0 }}
            showLabel={false}
          />
        ))}
      </BottomNavigation>
    </div>
  );
}

export default BottomAppBar;
