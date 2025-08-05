import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import SensorsIcon from '@mui/icons-material/Sensors';
import SensorsOffIcon from '@mui/icons-material/SensorsOff';
import MenuIcon from '@mui/icons-material/Menu';
import React from 'react';
import styles from '../../styles/layout/TopAppBar.module.css';

export default function TopAppBar({ rtc, isConnected, lastReceived, onMenuClick }) {
  return (
    <AppBar
      position="fixed"
      color="default"
      elevation={2}
      sx={{
        background: '#232136',
        color: '#fff',
        height: '48px',
        minHeight: '48px',
        boxSizing: 'border-box',
        width: '100%',
        left: 0,
        top: 0,
        zIndex: 1200
      }}
    >
      <Toolbar
        sx={{
          justifyContent: 'space-between',
          minHeight: '48px !important',
          height: '48px !important',
          paddingLeft: '24px !important',
          paddingRight: '24px !important',
          boxSizing: 'border-box'
        }}
      >
        <Typography variant="subtitle1" sx={{ fontWeight: 500, color: '#fff' }}>
          RTC: {rtc}
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          {isConnected ? (
            <SensorsIcon sx={{ color: '#7fffd4', fontSize: 28 }} />
          ) : (
            <SensorsOffIcon sx={{ color: '#ff6b6b', fontSize: 28 }} />
          )}
          <Typography
            variant="caption"
            sx={{
              color: '#bdbdbd',
              ml: 1,
              whiteSpace: 'nowrap'
            }}
          >
            (최근 수신 : {lastReceived || '없음'})
          </Typography>
          <span
            className={styles.menuBtn}
            onClick={onMenuClick}
            onMouseDown={(e) => e.currentTarget.classList.add(styles.menuActive)}
            onMouseUp={(e) => e.currentTarget.classList.remove(styles.menuActive)}
            onMouseLeave={(e) => e.currentTarget.classList.remove(styles.menuActive)}
          >
            <MenuIcon sx={{ color: '#fff', fontSize: 28, transition: 'color 0.15s' }} />
          </span>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
