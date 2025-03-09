const hvStyles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height: '100vh',
      margin: '0',
      padding: '20px',
      backgroundColor: '#e8f4f8',  // HV 관련 UI에 어울리는 밝은 배경색
      color: '#333',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      borderRadius: '8px',
      fontFamily: "'Arial', sans-serif",
    },
    rowContainer: {
      display: 'flex',
      justifyContent: 'space-around', // 한 줄로 배치
      alignItems: 'center',
      width: '80%',
      margin: '2.5%',
      padding: '2.5%',
      backgroundColor: '#fff',
      borderRadius: '10px',
      boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
      textAlign: 'center',
    },
    title: {
      fontSize: '30px',
      fontWeight: 'bold',
      color: '#222',
      marginBottom: '20px',
      marginTop: '2.5%',
      textAlign: 'center',
    },
    dataContainer: {
      width: '80%',
      margin: '5%',
      backgroundColor: '#fff',
      borderRadius: '10px',
      boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
      textAlign: 'center',
    },
    label: {
      fontSize: '20px',
      fontWeight: '600',
      color: '#666',
      marginBottom: '10px',
    },
    data: {
      fontSize: '36px',
      fontWeight: '700',
      color: '#000',
    },
    noData: {
      fontSize: '18px',
      color: '#ff0000',
      textAlign: 'center',
      marginTop: '20px',
    },
  };
  
  export default hvStyles;
  