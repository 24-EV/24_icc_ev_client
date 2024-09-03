import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

function Settings() {
  const [logging, setLogging] = useState(false);
  const [startTimestamp, setStartTimestamp] = useState(null);
  const [loading, setLoading] = useState(false);

  // socket을 useEffect 외부에 정의하여 startLogging 및 stopLogging에서 접근할 수 있도록 수정
  const socket = io('http://localhost:8080');  // socket 변수를 useEffect 외부에서 정의합니다.

  useEffect(() => {
    socket.on('connect', () => {
      console.log('WebSocket 연결 성공');
    });

    socket.on('disconnect', () => {
      console.log('WebSocket 연결 종료');
    });

    socket.on('excelStarted', (data) => {
      console.log('excelStarted 이벤트 수신:', data);  // 이 로그가 출력되는지 확인
      setLogging(true);
      setStartTimestamp(data.startTimestamp);
      setLoading(false); // 로딩 종료
    });

    socket.on('excelStopped', (data) => {
      console.log('excelStopped 이벤트 수신:', data);
      setLogging(false);
      setLoading(false); // 로딩 종료
    });

    socket.on('error', (error) => {
      console.error('WebSocket 오류:', error);
      setLoading(false); // 로딩 종료
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const startLogging = () => {
    setLoading(true); // 로딩 시작
    socket.emit('startExcel');
  };
const stopLogging = () => {
  setLoading(true); // 로딩 시작
  console.log('stopExcel 이벤트 전송');  // 이 로그가 출력되는지 확인
  socket.emit('stopExcel');
};


  return (
    <div>
      <h1>Data Logger</h1>
      <button onClick={startLogging} disabled={logging || loading}>
        {loading && logging ? 'Starting...' : 'Start Logging'}
      </button>
      <button onClick={stopLogging} disabled={!logging || loading}>
        {loading && !logging ? 'Stopping...' : 'Stop Logging'}
      </button>
      {startTimestamp && <p>Logging started at: {startTimestamp}</p>}
    </div>
  );
}

export default Settings;
