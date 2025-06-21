import React, { useContext, useEffect, useState } from 'react';
import { SocketContext } from '../context/SocketContext';
import commonStyles from '../styles/style';
import DataCard from '../components/common/DataCard';

function GPSPage() {
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);
  const [dragState, setDragState] = useState(true);
  const { gpsData } = useContext(SocketContext);
  const [path, setPath] = useState([]); // 경로 좌표 배열
  const [polyline, setPolyline] = useState(null); // 폴리라인 객체
  const [isPressed, setIsPressed] = useState(false);

  // 카카오맵 API 로드
  useEffect(() => {
    const kakaoMapScript = document.createElement('script');
    kakaoMapScript.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${import.meta.env.VITE_KAKAO_MAP_API_KEY}&autoload=false`;
    kakaoMapScript.async = true;
    document.head.appendChild(kakaoMapScript);

    kakaoMapScript.onload = () => {
      console.log('Kakao Maps API 로드 완료');
      loadKakaoMap(); // 스크립트 로드 후 지도 초기화 함수 호출
    };

    kakaoMapScript.onerror = () => {
      console.error('Kakao Maps API 로드 실패');
    };

    return () => {
      document.head.removeChild(kakaoMapScript);
    };
  }, []);

  // 카카오맵 초기화 및 마커 생성
  const loadKakaoMap = () => {
    if (window.kakao && window.kakao.maps) {
      console.log('로드카카오맵 if문 진입');
      window.kakao.maps.load(() => {
        console.log('Kakao Maps 로드 완료');

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
      console.error('Kakao Maps API가 로드되지 않았습니다.');
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

  // gpsData 들어올 때마다 path에 추가
  useEffect(() => {
    if (gpsData && gpsData.lat && gpsData.lng) {
      setPath((prev) => {
        // 같은 좌표가 연속으로 들어오는 경우 중복 추가 방지
        if (prev.length > 0) {
          const last = prev[prev.length - 1];
          if (last.lat === gpsData.lat && last.lng === gpsData.lng) return prev;
        }
        return [...prev, { lat: gpsData.lat, lng: gpsData.lng }];
      });
    }
  }, [gpsData]);

  // path가 바뀔 때마다 폴리라인 그리기
  useEffect(() => {
    if (map && path.length > 1) {
      const linePath = path.map((pos) => new window.kakao.maps.LatLng(pos.lat, pos.lng));
      // 기존 폴리라인 제거
      if (polyline) {
        polyline.setMap(null);
      }
      // 새 폴리라인 생성
      const newPolyline = new window.kakao.maps.Polyline({
        path: linePath,
        strokeWeight: 4,
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeStyle: 'solid',
      });
      newPolyline.setMap(map);
      setPolyline(newPolyline);
    }
  }, [map, path]);

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
        style={{
          ...commonStyles.gpsButton,
          ...(isPressed ? commonStyles.gpsButtonPressed : {}),
        }}
        onMouseDown={() => setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}
        onMouseLeave={() => setIsPressed(false)}
      >
        지도 마커 기준 고정
      </button>
      {gpsData && gpsData.lat !== null && gpsData.lng !== null
        ? `위도: ${gpsData.lat}, 경도: ${gpsData.lng}`
        : 'GPS 데이터 없음'}
      {/* GPS 데이터 수신 상태 메시지 */}
      <div style={{ marginTop: '20px', fontSize: '16px' }}>
        <DataCard
          label="GPS 데이터 상태"
          value={
            gpsData && gpsData.lat !== null && gpsData.lng !== null
              ? `위도: ${gpsData.lat}, 경도: ${gpsData.lng}`
              : 'GPS 데이터 없음'
          }
          unit={gpsData ? '' : ''}
        />
      </div>
    </div>
  );
}

export default GPSPage;
