import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { motion } from 'framer-motion'; // framer-motion 추가
import BottomAppBar from './components/BottomAppBar';
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
          display: 'flex',
          flexDirection: 'column',
          paddingBottom: 70,
          justifyContent: 'space-between',
          backgroundColor: 'purple',
        }}
      >
        <Router>
          <BottomAppBar />
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            style={{
              flex: 1, // 페이지가 화면 전체를 차지하도록
              maxWidth: '100%',
              padding: '10px',
              boxSizing: 'border-box',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Routes>
              <Route path="/" element={<Vehicle />} />
              <Route path="/vehicle" element={<Vehicle />} />
              <Route path="/hv" element={<HV />} />
              <Route path="/motor" element={<Motor />} />
              <Route path="/gps" element={<GPS />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </motion.div>
        </Router>
      </div>
    </SocketProvider>
  );
}

export default App;
