import React, { useState } from 'react';
import axios from 'axios';  // axios 임포트
import commonStyles from '../styles/style';  // 공통 스타일 가져오기

function SettingPage() {
  const [startDate, setStartDate] = useState('');  // 시작 날짜 상태
  const [endDate, setEndDate] = useState('');      // 종료 날짜 상태
  const [loading, setLoading] = useState(false);   // 로딩 상태

  // 서버로부터 Excel 파일을 다운로드하는 함수
  const downloadExcel = async () => {
    if (!startDate || !endDate) {
      alert('시작 날짜와 종료 날짜를 모두 입력해주세요.');
      return;
    }

    try {
      setLoading(true); // 로딩 상태 시작
      
      const response = await axios.post(`http://${REACT_APP_SERVER_URL_EC2}/export-excel`, {
      // const response = await axios.post('http:/localhost:2004/export-excel', {
        startDate,
        endDate
      }, {
        responseType: 'blob' // 서버로부터 Blob 형식의 응답을 받음
      });

      const url = window.URL.createObjectURL(new Blob([response.data])); // Blob을 URL로 변환
      const a = document.createElement('a');  // 다운로드를 위한 링크 태그 생성
      a.href = url;
      a.download = `data_${startDate}_${endDate}.xlsx`;  // 파일 이름 설정
      document.body.appendChild(a);
      a.click();  // 파일 다운로드 트리거
      a.remove(); // 링크 제거
    } catch (error) {
      console.error('파일 다운로드 중 오류 발생:', error);
      alert('파일 다운로드 중 오류가 발생했습니다.');
    } finally {
      setLoading(false); // 로딩 상태 종료
    }
  };

  return (
    <div style={commonStyles.container}>
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
      <button onClick={downloadExcel} disabled={loading} style={commonStyles.button}>
        {loading ? '다운로드 중...' : 'Excel 다운로드'}
      </button>
    </div>
  );
}

export default SettingPage;