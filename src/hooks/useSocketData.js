// 실시간 소켓 데이터 관리용 커스텀 훅(구현은 SocketContext에서 분리 예정)
import { HistoryRounded } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { SERVER_URL, CONTROLLER_VERSION } from '../config/envConfig';
import dataFormat from '../constants/DataFormat';

const socket = io(SERVER_URL, {
  reconnection: true,
  reconnectionAttempts: 20,
  reconnectionDelay: 100,
  reconnectionDelayMax: 5000,
  transports: ['websocket']
});

export function useSocketData() {
  // 설정
  const [loading, setLoading] = useState(true);
  const [socketError, setSocketError] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isSameControllerVersion, setIsSameControllerVersion] = useState(false);
  // 데이터
  const [vehicleData, setVehicleData] = useState(null);
  const [hvData, setHvData] = useState(null);
  const [motorData, setMotorData] = useState(null);
  const [gpsData, setGpsData] = useState(null);
  const [realTimeClock, setRealTimeClock] = useState(null);

  const onDataReceived = {
    24: onDataReceived24Controller,
    25: onDataReceived25Controller
  };

  function onDataReceivedTest(message, version = CONTROLLER_VERSION) {
    const setterMap = {
      vehicle: setVehicleData,
      hv: setHvData,
      motor: setMotorData,
      gps: setGpsData
    };

    try {
      const _data = message;

      Object.entries(dataFormat[version]).forEach(([groupKey, keysObj]) => {
        const newData = { ...dataFormat[version][groupKey] };
        const setter = setterMap[groupKey];
        if (!setter) {
          throw new Error(`잘못된 groupKey : ${groupKey}`);
        }

        Object.keys(keysObj).forEach((key) => {
          newData[key] = typeof _data[key] === 'number' ? _data[key] : null;
        });

        newData[groupKey].timestamp = typeof _data.timestamp === 'string' ? _data.timestamp : null;

        setter(newData);
      });

      setGpsData({
        lat: typeof _data.lat
      });
    } catch (error) {
      console.error('데이터 처리 오류!!!!', error);
    }
  }

  function onDataReceived24Controller(message) {
    try {
      const _data = message;
      setVehicleData({
        velocity: typeof _data.SPEED === 'number' ? _data.SPEED : null,
        timestamp: typeof _data.timestamp === 'string' ? _data.timestamp : null
      });
      setHvData({
        voltage: typeof _data.BATTERY_VOLTAGE === 'number' ? _data.BATTERY_VOLTAGE : null,
        current: typeof _data.MOTOR_CURRENT === 'number' ? _data.MOTOR_CURRENT : null,
        battery_percent: typeof _data.BATTERY_PERCENT === 'number' ? _data.BATTERY_PERCENT : null,
        timestamp: typeof _data.timestamp === 'string' ? _data.timestamp : null
      });
      setMotorData({
        THROTTLE_SIGNAL: typeof _data.THROTTLE_SIGNAL === 'number' ? _data.THROTTLE_SIGNAL : null,
        rpm: typeof _data.RPM === 'number' ? _data.RPM : null,
        controller_temperature:
          typeof _data.CONTROLLER_TEMPERATURE === 'number' ? _data.CONTROLLER_TEMPERATURE : null,
        timestamp: typeof _data.timestamp === 'string' ? _data.timestamp : null
      });
      setRealTimeClock({
        timestamp: typeof _data.timestamp === 'string' ? _data.timestamp : null
      });
      setGpsData({
        lat: typeof _data.lat === 'number' ? _data.lat : null,
        lng: typeof _data.lng === 'number' ? _data.lng : null,
        timestamp: typeof _data.timestamp === 'string' ? _data.timestamp : null
      });
      setLoading(false);
      setSocketError(null);
    } catch (error) {
      console.error('데이터 처리 오류!!!!', error);
    }
  }

  function onDataReceived25Controller(message) {
    // console.log('서버로부터 받은 데이터 : ', message);
    try {
      const _data = message;
      setVehicleData({
        velocity: typeof _data.SPEED === 'number' ? _data.SPEED : null,
        timestamp: typeof _data.timestamp === 'string' ? _data.timestamp : null
      });
      setHvData({
        voltage: typeof _data.BATTERY_VOLTAGE === 'number' ? _data.BATTERY_VOLTAGE : null,
        current: typeof _data.MOTOR_CURRENT === 'number' ? _data.MOTOR_CURRENT : null,
        battery_percent: typeof _data.BATTERY_PERCENT === 'number' ? _data.BATTERY_PERCENT : null,
        timestamp: typeof _data.timestamp === 'string' ? _data.timestamp : null
      });
      setMotorData({
        throttle: typeof _data.THROTTLE_SIGNAL === 'number' ? _data.THROTTLE_SIGNAL : null,
        rpm: typeof _data.RPM === 'number' ? _data.RPM : null,
        controller_temperature:
          typeof _data.CONTROLLER_TEMPERATURE === 'number' ? _data.CONTROLLER_TEMPERATURE : null,
        timestamp: typeof _data.timestamp === 'string' ? _data.timestamp : null
      });
      setRealTimeClock({
        timestamp: typeof _data.timestamp === 'string' ? _data.timestamp : null
      });
      setGpsData({
        lat: typeof _data.lat === 'number' ? _data.lat : null,
        lng: typeof _data.lng === 'number' ? _data.lng : null,
        timestamp: typeof _data.timestamp === 'string' ? _data.timestamp : null
      });
      setLoading(false);
      setSocketError(null);
    } catch (error) {
      console.error('데이터 처리 오류!!!!', error);
    }
  }

  useEffect(() => {
    socket.on('connect', function () {
      setIsConnected(true);
      setSocketError(null);
      setLoading(false);
      socket.emit('requestData');
    });

    socket.on('serverControllerVersion', function () {
      socket.emit('clientControllerVersion', CONTROLLER_VERSION);
    });

    socket.on('controllerVersionOK', function (message) {
      console.log(message);
      setIsSameControllerVersion(true);
    });

    socket.on('disconnect', function (reason) {
      setIsConnected(false);
      setSocketError('서버와 연결이 끊어졌습니다.');
      setLoading(true);
      console.warn('Disconnected. Reason:', reason);
    });

    socket.on('connect_error', function (error) {
      setIsConnected(false);
      setSocketError('서버 연결 실패: ' + (error?.message || '알 수 없는 오류'));
      setLoading(true);
    });

    socket.on('error', function (error) {
      console.log(error);
      setSocketError('WebSocket 오류: ' + (error?.message || '알 수 없는 오류'));
      setLoading(true);
    });

    socket.on('dataReceived', onDataReceived[CONTROLLER_VERSION]);

    return () => {
      socket.off();
    };
  }, [SERVER_URL]);

  return {
    loading,
    socketError,
    isConnected,
    isSameControllerVersion,
    vehicleData,
    hvData,
    motorData,
    gpsData,
    realTimeClock
  };
}
