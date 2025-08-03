import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';
import { SocketProvider } from './context/SocketContext';
import { HistoryProvider } from './context/HistoryContext';

const TestPageComponent = lazy(() => import('./features/test/pages/TestPage'));
const VehiclePageComponent = lazy(() => import('./features/vehicle/pages/VehiclePage'));
const HVPageComponent = lazy(() => import('./features/hv/pages/HVPage'));
const MotorPageComponent = lazy(() => import('./features/motor/pages/MotorPage'));
const GPSPageComponent = lazy(() => import('./features/gps/pages/GPSPage'));
const SettingPageComponent = lazy(() => import('./features/settings/pages/SettingsPage'));

function App() {
  return (
    <SocketProvider>
      <HistoryProvider>
        <Router>
          <AppLayout>
            <Routes>
              <Route path="/" element={<TestPageComponent />} />
              <Route path="/vehicle" element={<VehiclePageComponent />} />
              <Route path="/hv" element={<HVPageComponent />} />
              <Route path="/motor" element={<MotorPageComponent />} />
              <Route path="/gps" element={<GPSPageComponent />} />
              <Route path="/settings" element={<SettingPageComponent />} />
            </Routes>
          </AppLayout>
        </Router>
      </HistoryProvider>
    </SocketProvider>
  );
}

export default App;
