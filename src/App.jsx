import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BottomAppBar from './components/BottomAppBar';
import Vehicle from './pages/Vehicle';
import HV from './pages/HV';
import Motor from './pages/Motor';
import GPS from './pages/GPS';
import Settings from './pages/Settings';
import { SocketProvider } from './context/SocketContext';
import './App.css';

function App() {
  useEffect(() => {
    const kakaoMapScript = document.createElement('script');
    kakaoMapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_MAP_KEY}&autoload=false`;
    kakaoMapScript.async = true;
    document.head.appendChild(kakaoMapScript);

    kakaoMapScript.onload = () => {
      console.log('Kakao Maps API 로드 완료');
    };

    return () => {
      document.head.removeChild(kakaoMapScript);
    };
  }, []);

  return (
    <SocketProvider>
      <div className="app-container">
        <Router>
          <div className="app-content">
            <Routes>
              <Route path="/" element={<Vehicle />} />
              <Route path="/vehicle" element={<Vehicle />} />
              <Route path="/hv" element={<HV />} />
              <Route path="/motor" element={<Motor />} />
              <Route path="/gps" element={<GPS />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </div>
          <BottomAppBar />
        </Router>
      </div>
    </SocketProvider>
  );
}

export default App;
