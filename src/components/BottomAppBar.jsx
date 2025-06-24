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

  useEffect(() => {
    const idx = navItems.findIndex((item) => location.pathname.startsWith(item.path));
    setValue(idx === -1 ? 0 : idx);
  }, [location.pathname]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    navigate(navItems[newValue].path);
  };

  return (
    <nav className={styles.bottomAppBar}>
      <BottomNavigation
        value={value}
        onChange={handleChange}
        showLabels={false}
        className={styles.muiBottomNavigation}
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
    </nav>
  );
}

export default BottomAppBar;
