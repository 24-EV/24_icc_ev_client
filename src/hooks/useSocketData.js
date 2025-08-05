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
  const [realTimeClock, setRealTimeClock] = useState(null);
  const [totalData, setTotalData] = useState(null);

  function onDataReceived(message, version = CONTROLLER_VERSION) {
    try {
      if (!message) {
        throw new Error(`데이터가 없음`);
      }

      const newData = JSON.parse(JSON.stringify(dataFormat[version]));
      newData.timestamp = typeof message.timestamp === 'string' ? message.timestamp : null;
      setRealTimeClock(newData.timestamp);

      // message 기준으로 loop
      Object.entries(message).forEach(([rawKey, rawVal]) => {
        if (rawKey === 'timestamp') return; // timestamp는 이미 처리함

        // L/R 여부 확인
        const match = rawKey.match(/(.+)_([LR])$/);
        let baseKey = rawKey;
        let side = null;
        if (match) {
          baseKey = match[1];
          side = match[2]; // 'L' 또는 'R'
        }

        // newData 안의 groupKey 탐색
        Object.entries(newData).forEach(([groupKey, keysObj]) => {
          if (groupKey === 'timestamp') return;

          // 해당 group에 baseKey 존재하는지 확인
          if (keysObj[baseKey]) {
            if (side) {
              // 좌우 값 넣기
              if (keysObj[baseKey].value === null) {
                keysObj[baseKey].value = { L: null, R: null };
              }
              keysObj[baseKey].value[side] = typeof rawVal === 'number' ? rawVal : null;
            } else {
              // 일반 값 넣기
              keysObj[baseKey].value = typeof rawVal === 'number' ? rawVal : null;
            }
          }
        });
      });

      setTotalData(newData);
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

    socket.on('dataReceived', function (message) {
      onDataReceived(message);
    });

    return () => {
      socket.off();
    };
  }, [SERVER_URL]);

  return {
    loading,
    socketError,
    isConnected,
    isSameControllerVersion,
    totalData
  };
}
