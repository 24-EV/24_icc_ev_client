import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/common/PageLayout';
import SettingsPage from './pages/SettingsPage';
import MotorPage from './pages/MotorPage';
import HVPage from './pages/HVPage';
import GPSPage from './pages/GPSPage';
import TestPage from './pages/TestPage';
import VehiclePage from './pages/VehiclePage';
import Section from './components/Section';
import { SocketProvider } from './context/SocketContext';
import { HistoryProvider } from './context/HistoryContext';

const TestPageComponent = lazy(() => import('./pages/TestPage'));
const VehiclePageComponent = lazy(() => import('./pages/VehiclePage'));
const HVPageComponent = lazy(() => import('./pages/HVPage'));
const MotorPageComponent = lazy(() => import('./pages/MotorPage'));
const GPSPageComponent = lazy(() => import('./pages/GPSPage'));
const SettingPageComponent = lazy(() => import('./pages/SettingsPage'));

function App() {
  return (
    <SocketProvider>
      <HistoryProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<TestPageComponent />} />
              <Route path="/vehicle" element={<VehiclePageComponent />} />
              <Route path="/hv" element={<HVPageComponent />} />
              <Route path="/motor" element={<MotorPageComponent />} />
              <Route path="/gps" element={<GPSPageComponent />} />
              <Route path="/settings" element={<SettingPageComponent />} />
            </Routes>
          </Layout>
        </Router>
      </HistoryProvider>
    </SocketProvider>
  );
}

export default App;
