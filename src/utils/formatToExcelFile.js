import axios from 'axios';

// 서버로부터 Excel 파일을 다운로드하는 함수
async function formatToExcelFile(startDate, endDate) {
  if (!startDate || !endDate) {
    alert('시작 날짜와 종료 날짜를 모두 입력해주세요.');
    throw new Error('시작 날짜 또는 종료 날짜 미입력.');
  }

  const serverUrl = import.meta.env.VITE_SERVER_URL || 'http://localhost:2004';
  const response = await axios.post(
    `${serverUrl}/api/export-excel`,
    {
      startDate,
      endDate,
    },
    {
      responseType: 'blob', // 서버로부터 Blob 형식의 응답을 받음
    },
  );

  const url = window.URL.createObjectURL(new Blob([response.data])); // Blob을 URL로 변환
  const a = document.createElement('a'); // 다운로드를 위한 링크 태그 생성
  a.href = url;
  a.download = `data_${startDate}_${endDate}.xlsx`; // 파일 이름 설정
  document.body.appendChild(a);
  a.click(); // 파일 다운로드 트리거
  a.remove(); // 링크 제거
}

export default formatToExcelFile;
