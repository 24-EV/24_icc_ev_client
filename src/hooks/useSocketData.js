// 실시간 소켓 데이터 관리용 커스텀 훅(구현은 SocketContext에서 분리 예정)
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

export function useSocketData(serverUrl = 'http://localhost:2004') {
  const [loading, setLoading] = useState(true);
  const [vehicleData, setVehicleData] = useState(null);
  const [hvData, setHvData] = useState(null);
  const [motorData, setMotorData] = useState(null);
  const [gpsData, setGpsData] = useState(null);
  const [realTimeClock, setRealTimeClock] = useState(null);
  const [socketError, setSocketError] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const socket = io(serverUrl, {
      reconnection: true,
      reconnectionAttempts: 20,
      reconnectionDelay: 100,
      reconnectionDelayMax: 5000,
      transports: ['websocket'],
    });

    socket.on('connect', function () {
      setIsConnected(true);
      setSocketError(null);
      setLoading(false);
      socket.emit('requestData');
    });

    socket.on('disconnect', function () {
      setIsConnected(false);
      setSocketError('서버와 연결이 끊어졌습니다.');
      setLoading(true);
    });

    socket.on('connect_error', function (error) {
      setIsConnected(false);
      setSocketError('서버 연결 실패: ' + (error?.message || '알 수 없는 오류'));
      setLoading(true);
    });

    socket.on('error', function (error) {
      setSocketError('WebSocket 오류: ' + (error?.message || '알 수 없는 오류'));
      setLoading(true);
    });

    socket.on('dataReceived', function (message) {
      console.log('서버로부터 받은 데이터 : ', message);
      try {
        const _data = message;
        setVehicleData({
          velocity: typeof _data.SPEED === 'number' ? _data.SPEED : null,
          timestamp: typeof _data.timestamp === 'string' ? _data.timestamp : null,
        });
        setHvData({
          voltage: typeof _data.BATTERY_VOLTAGE === 'number' ? _data.BATTERY_VOLTAGE : null,
          current: typeof _data.MOTOR_CURRENT === 'number' ? _data.MOTOR_CURRENT : null,
          battery_percent: typeof _data.BATTERY_PERCENT === 'number' ? _data.BATTERY_PERCENT : null,
          timestamp: typeof _data.timestamp === 'string' ? _data.timestamp : null,
        });
        setMotorData({
          throttle: typeof _data.THROTTLE_SIGNAL === 'number' ? _data.THROTTLE_SIGNAL : null,
          rpm: typeof _data.RPM === 'number' ? _data.RPM : null,
          controller_temperature:
            typeof _data.CONTROLLER_TEMPERATURE === 'number' ? _data.CONTROLLER_TEMPERATURE : null,
          timestamp: typeof _data.timestamp === 'string' ? _data.timestamp : null,
        });
        setRealTimeClock({
          timestamp: typeof _data.timestamp === 'string' ? _data.timestamp : null,
        });
        setGpsData({
          lat: typeof _data.lat === 'number' ? _data.lat : null,
          lng: typeof _data.lng === 'number' ? _data.lng : null,
          timestamp: typeof _data.timestamp === 'string' ? _data.timestamp : null,
        });
        setLoading(false);
        setSocketError(null);
      } catch (error) {
        console.error('데이터 처리 오류!!!!', error);
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [serverUrl]);

  return {
    loading,
    vehicleData,
    hvData,
    motorData,
    gpsData,
    realTimeClock,
    socketError,
    isConnected,
  };
}
