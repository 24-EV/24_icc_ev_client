const motorStyles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height: '100vh',
      margin: '0',
      padding: '20px',
      backgroundColor: '#e8f4f8',
      color: '#333',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      borderRadius: '10px',
      fontFamily: "'Helvetica Neue', sans-serif",
    },
    title: {
      marginBottom: '20px',
      fontSize: '28px',
      fontWeight: '700',
      color: '#333',
      textAlign: 'center',
    },
    rowContainer: {
      display: 'flex',
      justifyContent: 'space-around', // 데이터를 화면에 균등하게 배치
      width: '100%',
      marginBottom: '20px',
    },
    dataItem: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: '30%', // 각 데이터 항목이 차지하는 비율
      padding: '10px',
      backgroundColor: '#fff',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
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
    chartContainer: {
      width: '100%',
      height: '350px',  // 차트 높이를 350px로 설정
      backgroundColor: '#f0f0f0',
      borderRadius: '8px',
      padding: '15px',
      marginBottom: '20px',
      boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
    },
    noData: {
      fontSize: '18px',
      color: '#ff0000',
      textAlign: 'center',
      marginTop: '20px',
    },
  };
  
  export default motorStyles;
  