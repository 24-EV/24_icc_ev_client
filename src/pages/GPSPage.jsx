import React, { useContext, useEffect, useState } from 'react';
import { SocketContext } from '../context/SocketContext';
import commonStyles from '../styles/style';

function GPSPage() {
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);
  const [dragState, setDragState] = useState(true);
  const { gpsData } = useContext(SocketContext);

  // 카카오맵 API 로드
  useEffect(() => {
    const kakaoMapScript = document.createElement('script');
    kakaoMapScript.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${import.meta.env.VITE_KAKAO_MAP_API_KEY}&autoload=false`;
    kakaoMapScript.async = true;
    document.head.appendChild(kakaoMapScript);

    kakaoMapScript.onload = () => {
      console.log("Kakao Maps API 로드 완료");
      loadKakaoMap(); // 스크립트 로드 후 지도 초기화 함수 호출
    };

    kakaoMapScript.onerror = () => {
      console.error("Kakao Maps API 로드 실패");
    };

    return () => {
      document.head.removeChild(kakaoMapScript);
    };
  }, []);

  // 카카오맵 초기화 및 마커 생성
  const loadKakaoMap = () => {
    if (window.kakao && window.kakao.maps) {
      console.log("로드카카오맵 if문 진입");
      window.kakao.maps.load(() => {
        console.log("Kakao Maps 로드 완료");

        // 지도 컨테이너
        const container = document.getElementById('map');
        const options = {
          center: new window.kakao.maps.LatLng(33.450701, 126.570667), // 기본 위치
          level: 3,
        };

        // 맵 초기화
        const kakaoMap = new window.kakao.maps.Map(container, options);
        setMap(kakaoMap);

        // 마커 생성
        const newMarker = new window.kakao.maps.Marker({
          position: options.center,
          draggable: dragState,
        });
        newMarker.setMap(kakaoMap);
        setMarker(newMarker);
      });
    } else {
      console.error("Kakao Maps API가 로드되지 않았습니다.");
    }
  };

  // GPS 데이터로 마커 위치 업데이트
  useEffect(() => {
    if (map && marker && gpsData && gpsData.lat && gpsData.lng) {
      const newPosition = new window.kakao.maps.LatLng(gpsData.lat, gpsData.lng);
      marker.setPosition(newPosition);

      if (dragState) {
        map.setCenter(newPosition);
      }
    }
  }, [gpsData, map, marker, dragState]);

  // 버튼 클릭시 마커 드래그 상태 변경
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

      {/* 지도 컨테이너 */}
      <div id="map" style={{ width: '100%', height: '400px' }}></div>

      {/* 버튼 클릭 시 마커 고정/드래그 가능 상태 전환 */}
      <button 
        onClick={handleButtonClick} 
        style={commonStyles.gpsButton}
      >
        지도 마커 기준 고정
      </button>

      {/* GPS 데이터 수신 상태 메시지 */}
      <div style={{ marginTop: '20px', fontSize: '16px', color: gpsData ? '#4CAF50' : '#FF0000' }}>
        {gpsData ? 'GPS 데이터를 성공적으로 수신했습니다.' : 'GPS 데이터를 수신하지 못했습니다.'}
      </div>
    </div>
  );
}

export default GPSPage;
