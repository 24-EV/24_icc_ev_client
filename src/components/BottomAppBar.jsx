import React, { useEffect, useState } from 'react';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import {
  DirectionsCar,
  BatteryChargingFull,
  CarRepair,
  LocationOn,
  Settings,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { styled } from '@mui/system';

const CustomBottomNavigation = styled(BottomNavigation)({
  '& .MuiBottomNavigationAction-label': {
    transition: 'all 0.2s',
    opacity: 0,
  },
  '& .Mui-selected .MuiBottomNavigationAction-label': {
    opacity: 1,
  },
  '& .MuiBottomNavigationAction-root:hover .MuiBottomNavigationAction-label': {
    opacity: 1,
  },
});

function BottomAppBar({ data }) {
  const [value, setValue] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  // 새로고침시에도 바텀앱바 버튼 유지되도록 함
  useEffect(() => {
    switch (location.pathname) {
      case '/vehicle':
        setValue(0);
        break;
      case '/hv':
        setValue(1);
        break;
      case '/motor':
        setValue(2);
        break;
      case '/gps':
        setValue(3);
        break;
      case '/settings':
        setValue(4);
        break;
      default:
        setValue(0); // 기본값
        break;
    }
  }, [location.pathname]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    switch (newValue) {
      case 0:
        navigate('/vehicle');
        break;
      case 1:
        navigate('/hv');
        break;
      case 2:
        navigate('/motor');
        break;
      case 3:
        navigate('/gps');
        break;
      case 4:
        navigate('/settings');
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <div>
        {/* <h4> */}
        RTC MODULE:<br></br>
        {data}
        {/* </h4> */}
      </div>
      <CustomBottomNavigation
        value={value}
        onChange={handleChange}
      >
        <BottomNavigationAction label="Vehicle" icon={<DirectionsCar />} />
        <BottomNavigationAction label="HV" icon={<BatteryChargingFull />} />
        <BottomNavigationAction label="Motor" icon={<CarRepair />} />
        <BottomNavigationAction label="GPS" icon={<LocationOn />} />
        <BottomNavigationAction label="Settings" icon={<Settings />} />
      </CustomBottomNavigation>
    </div>
  );
}

export default BottomAppBar;
