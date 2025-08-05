import {
  DirectionsCar,
  BatteryChargingFull,
  CarRepair,
  LocationOn,
  Settings
} from '@mui/icons-material';

export const NAV_ITEMS = [
  { label: 'Vehicle', icon: DirectionsCar, path: '/vehicle' },
  { label: 'HV', icon: BatteryChargingFull, path: '/hv' },
  { label: 'Motor', icon: CarRepair, path: '/motor' },
  { label: 'GPS', icon: LocationOn, path: '/gps' }
  // { label: 'Settings', icon: Settings, path: '/settings' }
];
