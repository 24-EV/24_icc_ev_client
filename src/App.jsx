import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';
import { SocketProvider } from './context/SocketContext';
import { HistoryProvider } from './context/HistoryContext';

const VehiclePageComponent = lazy(() => import('./features/vehicle/pages/VehiclePage'));
const HVPageComponent = lazy(() => import('./features/hv/pages/HVPage'));
const MotorPageComponent = lazy(() => import('./features/motor/pages/MotorPage'));
const GPSPageComponent = lazy(() => import('./features/gps/pages/GPSPage'));
const DashboardPageComponent = lazy(() => import('./features/dashboard/pages/DashboardPage'));
const ChartsPageComponent = lazy(() => import('./features/charts/pages/ChartsPage'));
const SettingPageComponent = lazy(() => import('./features/settings/pages/SettingsPage'));

function App() {
  return (
    <Suspense fallback={<div>test</div>}>
      <SocketProvider>
        <HistoryProvider>
          <Router>
            <AppLayout>
              <Routes>
                <Route path="/" element={<DashboardPageComponent />} />
                <Route path="/vehicle" element={<VehiclePageComponent />} />
                <Route path="/hv" element={<HVPageComponent />} />
                <Route path="/motor" element={<MotorPageComponent />} />
                <Route path="/gps" element={<GPSPageComponent />} />
                <Route path="/charts" element={<ChartsPageComponent />} />
                <Route path="/dashboard" element={<DashboardPageComponent />} />
                <Route path="/settings" element={<SettingPageComponent />} />
              </Routes>
            </AppLayout>
          </Router>
        </HistoryProvider>
      </SocketProvider>
    </Suspense>
  );
}

export default App;
