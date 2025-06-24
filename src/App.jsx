import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import BottomAppBar from './components/BottomAppBar';
import { SocketProvider } from './context/SocketContext';
import RealTime from './components/RealTime';
import Section from './components/Section';

const TestPage = lazy(() => import('./pages/TestPage'));
const VehiclePage = lazy(() => import('./pages/VehiclePage'));
const HVPage = lazy(() => import('./pages/HVPage'));
const MotorPage = lazy(() => import('./pages/MotorPage'));
const GPSPage = lazy(() => import('./pages/GPSPage'));
const SettingPage = lazy(() => import('./pages/SettingsPage'));

function App() {
  return (
    <SocketProvider>
      <BrowserRouter>
        <RealTime />
        <Section>
          <Suspense fallback={<div style={{ textAlign: 'center', marginTop: 40 }}>로딩 중...</div>}>
            <Routes>
              <Route path="/" element={<TestPage />} />
              <Route path="/vehicle" element={<VehiclePage />} />
              <Route path="/hv" element={<HVPage />} />
              <Route path="/motor" element={<MotorPage />} />
              <Route path="/gps" element={<GPSPage />} />
              <Route path="/settings" element={<SettingPage />} />
            </Routes>
          </Suspense>
        </Section>
        <BottomAppBar />
      </BrowserRouter>
    </SocketProvider>
  );
}

export default App;
