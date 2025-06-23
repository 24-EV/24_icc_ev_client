import React, { useState } from 'react';
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
      <h1>Excel 데이터 다운로드</h1>
      <div>
        <label>
          시작 날짜:
          <br></br>
          <input
            type="datetime-local"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          종료 날짜:
          <br></br>
          <input
            type="datetime-local"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </label>
      </div>
      <button
        onClick={handleDownloadExcel}
        disabled={loading}
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
