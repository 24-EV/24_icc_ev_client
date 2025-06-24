import React, { useContext, useEffect, useState } from 'react';
import { SocketContext } from '../context/SocketContext';
import DataCard from '../components/common/DataCard';
import {
  loadKakaoMap,
  updateMarkerPosition,
  addMarkerPath,
  drawPolyline,
} from '../utils/kakaoMapService';

function GPSPage() {
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);
  const [dragState, setDragState] = useState(true);
  const { gpsData } = useContext(SocketContext);
  const [path, setPath] = useState([]); // 경로 좌표 배열
  const [polyline, setPolyline] = useState(null); // 폴리라인 객체
  const [isPressed, setIsPressed] = useState(false);

  async function initMap() {
    try {
      const { kakaoMap, newMarker } = await loadKakaoMap(gpsData, dragState);
      setMap(kakaoMap);
      setMarker(newMarker);
    } catch (error) {
      console.error('카카오맵 로드 실패 : ', error);
    }
  }

  useEffect(function () {
    initMap();
  }, []);

  // GPS 데이터로 마커 위치 업데이트
  useEffect(
    function () {
      if (map && marker && gpsData && gpsData.lat && gpsData.lng) {
        updateMarkerPosition(map, marker, gpsData, dragState);
      }
    },
    [gpsData, map, marker, dragState],
  );

  // gpsData 들어올 때마다 path에 추가
  useEffect(() => {
    if (gpsData && gpsData.lat && gpsData.lng) {
      setPath((prevPath) => addMarkerPath(gpsData, prevPath));
    }
  }, [gpsData]);

  // path가 바뀔 때마다 폴리라인 그리기
  useEffect(() => {
    if (!map || path.length < 2) return;
    const newPolyline = drawPolyline(map, path, polyline);
    if (newPolyline) {
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
    <div>
      <h1>GPS</h1>

      {/* 지도 컨테이너 */}
      <div
        id="map"
        style={{
          width: '95%',
          height: '300px',
        }}
      ></div>

      {/* 버튼 클릭 시 마커 고정/드래그 가능 상태 전환 */}
      <button
        onClick={handleButtonClick}
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
      <div>
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
