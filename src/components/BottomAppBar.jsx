import React from 'react';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import { DirectionsCar, BatteryChargingFull, CarRepair, LocationOn, Settings } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/system';

const CustomBottomNavigation = styled(BottomNavigation)({
  '& .MuiBottomNavigationAction-label': {
    transition: 'all 0.2s',
    opacity: 0,
  },
  '& .Mui-selected .MuiBottomNavigationAction-label': {
    opacity: 1,
  },
});

function BottomAppBar({ data }) {
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();

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
    <div style={{ position: 'fixed', bottom: 0, width: '100%', height:70, backgroundColor: 'red', display: 'flex', alignItems: 'center' }}>
      <div style={{flexGrow:1, display:'none'}}>
        {/* <h4 style={{ color: 'black', paddingLeft: '16px' }}> */}
          RTC MODULE:<br></br>{data}
        {/* </h4> */}
      </div>
      <CustomBottomNavigation
        value={value}
        onChange={handleChange}
        style={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          backgroundColor: '#ffffff',
          height:'100%',
          flexGrow:5
        }}
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
