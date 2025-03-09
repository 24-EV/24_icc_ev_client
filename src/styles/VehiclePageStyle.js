const vehicleStyles = {
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
  dataContainer: {
    margin: 'auto 1%',
    width: '100%',
    padding: '10px',
    textAlign: 'center',
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
    height: '350px',  // 차트의 높이를 350px로 조정
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

export default vehicleStyles;
