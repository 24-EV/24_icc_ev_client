import React, { useEffect } from 'react';
import { BrowserRouter , HashRouter, Route, Routes } from 'react-router-dom';
import BottomAppBar from './components/BottomAppBar';
import TestPage from './pages/TestPage';
import VehiclePage from './pages/VehiclePage';
import HVPage from './pages/HVPage';
import MotorPage from './pages/MotorPage';
import GPSPage from './pages/GPSPage';
import SettingPage from './pages/SettingPage';
import { SocketProvider } from './context/SocketContext';
import './App.css';
import RealTime from './components/RealTime';

function App() {
  useEffect(function() {
    console.log("환경 변수 확인:", import.meta.env.VITE_KAKAO_MAP_API_KEY);

    const kakaoMapScript = document.createElement('script');
    kakaoMapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${import.meta.env.VITE_KAKAO_MAP_KEY}`;
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
      <HashRouter>  {/* ← 여기 */}
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
        <RealTime />
        <BottomAppBar />
      </HashRouter>
    </div>
  </SocketProvider>
);

}

export default App;
