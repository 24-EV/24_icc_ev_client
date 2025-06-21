import React, { useState } from 'react';
import axios from 'axios'; // axios 임포트
import commonStyles from '../styles/style'; // 공통 스타일 가져오기
import downloadExcel from '../utils/downloadExcel';

function DownloadExcelComponent() {
  const [startDate, setStartDate] = useState(''); // 시작 날짜 상태
  const [endDate, setEndDate] = useState(''); // 종료 날짜 상태
  const [loading, setLoading] = useState(false); // 로딩 상태
  const [isPressed, setIsPressed] = useState(false); // 버튼 눌림 상태

  async function handleDownloadExcel() {
    try {
      setLoading(true);
      await downloadExcel(startDate, endDate);
    } catch (error) {
      console.error('액셀 파일 다운로드 실패 : ', error);
      alert('파일 다운로드 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h1 style={commonStyles.title}>Excel 데이터 다운로드</h1>
      <div style={commonStyles.dataContainer}>
        <label style={commonStyles.label}>
          시작 날짜:
          <br></br>
          <input
            type="datetime-local"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            style={commonStyles.input}
          />
        </label>
      </div>
      <div style={commonStyles.dataContainer}>
        <label style={commonStyles.label}>
          종료 날짜:
          <br></br>
          <input
            type="datetime-local"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            style={commonStyles.input}
          />
        </label>
      </div>
      <button
        onClick={handleDownloadExcel}
        disabled={loading}
        style={{
          ...commonStyles.gpsButton,
          ...(isPressed ? commonStyles.gpsButtonPressed : {}),
        }}
        onMouseDown={() => setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}
        onMouseLeave={() => setIsPressed(false)}
      >
        {loading ? '다운로드 중...' : 'Excel 다운로드'}
      </button>
    </div>
  );
}

export default DownloadExcelComponent;
