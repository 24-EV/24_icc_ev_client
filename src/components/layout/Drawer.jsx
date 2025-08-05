import React from 'react';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import DarkModeCard from '../common/DarkModeCard';
import DownloadExcelForm from '../forms/DownloadExcelForm';
import styles from '../../styles/layout/Drawer.module.css';

function Drawer({ open, onClose, onOpen }) {
  return (
    <SwipeableDrawer
      anchor="right"
      open={open}
      onClose={onClose}
      onOpen={onOpen}
      classes={{
        paper: styles.drawerPaper
      }}
    >
      <div className={styles.drawerContent}>
        <h2 className={styles.drawerTitle}>설정</h2>
        <DarkModeCard />
        <DownloadExcelForm />\
        <div>
          <h1>도움말</h1>
        </div>
      </div>
    </SwipeableDrawer>
  );
}

export default Drawer;
