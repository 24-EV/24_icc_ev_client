import React, { createContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';

// Context 생성
export const SocketContext = createContext();

export function SocketProvider({ children }) {
  const [loading, setLoading] = useState(true); // 로딩 상태 관리
  const [vehicleData, setVehicleData] = useState(null); // 속도
  const [hvData, setHvData] = useState(null); // 전압, 전류, 배터리 잔량
  const [motorData, setMotorData] = useState(null); // 쓰로틀 개도량, RPM, 컨트롤러 온도
  const [gpsData, setGpsData] = useState(null); // 위도, 경도 
  const [realTimeClock, setRealTimeClock] = useState(null); // RTC(Real Time Clock) 모듈

  useEffect(() => {
    // const socket = io(`${process.env.REACT_APP_SERVER_URL_EC2}`,{
    const socket = io('http://localhost:2004',{
      reconnection: true,
      reconnectionAttempts: 20,
      reconnectionDelay: 100,
      reconnectionDelayMax: 5000,
      transports: ['websocket']
    });
    // 소켓 연결

    // 소켓 연결 성공 시
    socket.on('connect', function() {
      console.log('WebSocket 연결 성공');
      socket.emit('requestData');
    });

    // 소켓 연결 종료 시
    socket.on('disconnect', function() {
      console.log('WebSocket 연결 종료');
    });

    // 소켓 에러 발생 시
    socket.on('error', function(error) {
      console.error('WebSocket 오류', error);
      setLoading(true);
    });

    // 데이터 수신 시
    socket.on('dataReceived', function (message) {
      console.log('서버로부터 받은 데이터 : ', message);
      try {
          const _data = message;

          setVehicleData({ velocity: _data.SPEED, timestamp : _data.timestamp });
          setHvData({ voltage: _data.BATTERY_VOLTAGE, current: _data.MOTOR_CURRENT, battery_percent: _data.BATTERY_PERCENT, timestamp : _data.timestamp });
          setMotorData({ throttle: _data.THROTTLE_SIGNAL, rpm: _data.RPM, controller_temperature: _data.CONTROLLER_TEMPERATURE, timestamp : _data.timestamp });
          setRealTimeClock({ timestamp : _data.timestamp });
          setGpsData({ lat: _data.lat || 0, lng: _data.lng || 0, timestamp : _data.timestamp});

          setLoading(false);
      } catch (error) {
        console.error('데이터 처리 오류!!!!', error);
      }
    });

    // 컴포넌트 언마운트 시 소켓 해제
    return function() {
      socket.disconnect();
      console.log("소켓 연결 해제");
    };
  }, []); // 빈 배열을 넣어 한 번만 실행되도록 설정

  return (
    <SocketContext.Provider value={{ loading, vehicleData, hvData, motorData, gpsData, realTimeClock }}>
      {children}
    </SocketContext.Provider>
  );
}
