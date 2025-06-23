import React, { useEffect, Suspense, lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import BottomAppBar from './components/BottomAppBar';
import { SocketProvider } from './context/SocketContext';
import RealTime from './components/RealTime';

const TestPage = lazy(() => import('./pages/TestPage'));
const VehiclePage = lazy(() => import('./pages/VehiclePage'));
const HVPage = lazy(() => import('./pages/HVPage'));
const MotorPage = lazy(() => import('./pages/MotorPage'));
const GPSPage = lazy(() => import('./pages/GPSPage'));
const SettingPage = lazy(() => import('./pages/SettingsPage'));

function App() {
  return (
    <SocketProvider>
      <div className="app-container">
        <BrowserRouter>
          <Suspense fallback={<div style={{ textAlign: 'center', marginTop: 40 }}>로딩 중...</div>}>
            <div className="app-content">
              <Routes>
                <Route path="/" element={<TestPage />} />
                <Route path="/vehicle" element={<VehiclePage />} />
                <Route path="/hv" element={<HVPage />} />
                <Route path="/motor" element={<MotorPage />} />
                <Route path="/gps" element={<GPSPage />} />
                <Route path="/settings" element={<SettingPage />} />
              </Routes>
            </div>
          </Suspense>
          <RealTime />
          <BottomAppBar />
        </BrowserRouter>
      </div>
    </SocketProvider>
  );
}

export default App;
