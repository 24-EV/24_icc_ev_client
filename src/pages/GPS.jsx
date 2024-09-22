import React, { useContext, useEffect, useState } from 'react';
import { SocketContext } from '../context/SocketContext';
import commonStyles from '../styles/style';

function GPS() {
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);
  const [dragState, setDragState] = useState(true);
  const { gpsData } = useContext(SocketContext);

  useEffect(() => {
    const loadKakaoMap = () => {
      if (window.kakao && window.kakao.maps) {
        window.kakao.maps.load(() => {
          const container = document.getElementById('map');
          const options = {
            center: new window.kakao.maps.LatLng(33.450701, 126.570667),
            level: 3,
          };
          const kakaoMap = new window.kakao.maps.Map(container, options);
          setMap(kakaoMap);

          const newMarker = new window.kakao.maps.Marker({
            position: options.center,
            draggable: dragState,
          });
          newMarker.setMap(kakaoMap);
          setMarker(newMarker);
        });
      }
    };

    if (window.kakao && window.kakao.maps) {
      loadKakaoMap();
    }
  }, [dragState]);

  useEffect(() => {
    if (map && marker && gpsData && gpsData.lat && gpsData.lng) {
      const newPosition = new window.kakao.maps.LatLng(gpsData.lat, gpsData.lng);
      marker.setPosition(newPosition);

      if (dragState) {
        map.setCenter(newPosition);
      }
    }
  }, [gpsData, map, marker, dragState]);

  const handleButtonClick = () => {
    if (map && marker) {
      const newDragState = !dragState;
      setDragState(newDragState);
      marker.setDraggable(newDragState);
      map.setDraggable(newDragState);
    }
  };

  return (
    <div style={commonStyles.container}>
      <h1 style={commonStyles.title}>GPS</h1>

      <div id="map" style={commonStyles.map}></div>

      <button 
        onClick={handleButtonClick} 
        style={commonStyles.gpsButton}
      >
        지도 마커 기준 고정
      </button>

      <div style={{ marginTop: '20px', fontSize: '16px', color: gpsData ? '#4CAF50' : '#FF0000' }}>
        {gpsData ? 'GPS 데이터를 성공적으로 수신했습니다.' : 'GPS 데이터를 수신하지 못했습니다.'}
        <p>api 키 : {process.env.REACT_APP_KAKAO_MAP_KEY}</p>
      </div>
    </div>
  );
}

export default GPS;
