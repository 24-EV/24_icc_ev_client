const commonStyles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%', // 화면 전체 너비를 차지하도록 설정
    height: '100vh',
    margin: '0', // 여백 없앰
    padding: '20px', // 필요한 경우 내부 여백 추가 (여백이 문제면 줄여볼 수 있음)
    backgroundColor: '#e8f4f8',
    color: '#333',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    borderRadius: '0', // 전체 화면을 덮도록 설정
    fontFamily: "'Helvetica Neue', sans-serif",
  },
  title: {
    marginBottom: '20px',
    fontSize: '28px',
    fontWeight: '700',
    color: '#333',
    textAlign: 'center',
  },
  dataContainer: {
    marginBottom: '20px',
    width: '100%', // 데이터 컨테이너가 화면 전체 너비를 차지하도록 설정
    textAlign: 'center',
  },
  label: {
    fontSize: '18px',
    fontWeight: '500',
    color: '#555',
    marginBottom: '5px',
  },
  data: {
    fontSize: '32px',
    fontWeight: '600',
    color: '#000',
  },
  input: {
    width: '300px',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '16px',
    boxSizing: 'border-box',
  },
  button: {
    width: '300px',
    padding: '10px 20px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background-color 0.3s ease',
  },
  buttonHover: {
    backgroundColor: '#45a049',
  },
  noData: {
    fontSize: '18px',
    color: '#ff0000',
    textAlign: 'center',
    marginTop: '20px',
  },
  map: {
    width: '400px', // 지도 너비를 버튼과 동일하게 설정
    height: '300px',
    borderRadius: '10px',
    marginBottom: '20px', // 지도와 아래 버튼 사이 마진 추가
  },
  gpsButton: {
    width: '300px',
    padding: '10px 20px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background-color 0.3s ease, transform 0.1s',
    marginBottom: '10px', // 버튼과 상태 텍스트 간의 마진 추가
  },
  gpsButtonPressed: {
    backgroundColor: '#388e3c', // 더 어두운 초록
    transform: 'scale(0.97)',
    boxShadow: '0 2px 4px rgba(0,0,0,0.15) inset',
  },
};

export default commonStyles;
