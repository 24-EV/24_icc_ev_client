import {
  DirectionsCar,
  BatteryChargingFull,
  CarRepair,
  LocationOn,
  Settings,
  ShowChart,
  Dashboard
} from '@mui/icons-material';

export const NAV_ITEMS = [
  { label: 'Vehicle', icon: DirectionsCar, path: '/vehicle' },
  { label: 'HV', icon: BatteryChargingFull, path: '/hv' },
  { label: 'Motor', icon: CarRepair, path: '/motor' },
  { label: 'GPS', icon: LocationOn, path: '/gps' },
  { label: 'Charts', icon: ShowChart, path: '/charts' },
  { label: 'Dashboard', icon: Dashboard, path: '/dashboard' }
  // { label: 'Settings', icon: Settings, path: '/settings' }
];
