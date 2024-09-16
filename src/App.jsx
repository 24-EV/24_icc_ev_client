import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BottomAppBar from './components/BottomAppBar';
import Loading from './components/Loading';
import Vehicle from './pages/Vehicle';
import HV from './pages/HV';
import Motor from './pages/Motor';
import GPS from './pages/GPS';
import Settings from './pages/Settings';
import { SocketProvider } from './context/SocketContext'; // SocketProvider 불러오기

function App() {
  return (
    <SocketProvider>
      <div
        style={{
          width: '100vw',
          height: '100vh',
          paddingBottom: 70,
        }}
      >
        <Router>
          <BottomAppBar />
          <div>
            <Routes>
              <Route path="/" element={<Vehicle />} />
              <Route path="/vehicle" element={<Vehicle />} />
              <Route path="/hv" element={<HV />} />
              <Route path="/motor" element={<Motor />} />
              <Route path="/gps" element={<GPS />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </div>
        </Router>
      </div>
    </SocketProvider>
  );
}

export default App;
