import React, { createContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';

// Context 생성
export const SocketContext = createContext();

export function SocketProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const [vehicleData, setVehicleData] = useState(null);
  const [hvData, setHvData] = useState(null);
  const [motorData, setMotorData] = useState(null);
  const [gpsData, setGpsData] = useState(null);
  const [rtc_module, setRtc_module] = useState(null);

  useEffect(() => {
    const socket = io('http://127.0.0.1:8080');

    socket.on('connect', () => {
      console.log('WebSocket 연결 성공');
      socket.emit('requestData');
    });

    socket.on('disconnect', () => {
      console.log('WebSocket 연결 종료');
    });

    socket.on('error', (error) => {
      console.error('WebSocket 오류', error);
      setLoading(true);
    });

    socket.on('dataReceived', (message) => {
      console.log('Received message from server:', message);
      try {
        const _data = message.data[0].data[0];

        setVehicleData({ velocity: _data.velocity, rtc_module: _data.RTC });
        setHvData({ voltage: _data.BATTERY_VOLTAGE, current: _data.MOTOR_CURRENT, battery_temperature: _data.PCB_TEMP });
        setMotorData({ throttle: _data.THROTTLE_SIGNAL, rpm: _data.RPM, torque: _data.torque, motor_temperature: _data.CONTROLLER_TEMPERATURE });
        setGpsData({ lat: _data.lat, lng: _data.lng });
        setRtc_module(_data.RTC);

        setLoading(false);
      } catch (error) {
        console.error('데이터 처리 오류', error);
      }
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ loading, vehicleData, hvData, motorData, gpsData, rtc_module }}>
      {children}
    </SocketContext.Provider>
  );
}
