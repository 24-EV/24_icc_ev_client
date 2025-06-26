import React, { useContext, useEffect, useState } from 'react';
import { SocketContext } from '../../context/SocketContext';
import {
  loadKakaoMap,
  updateMarkerPosition,
  addMarkerPath,
  drawPolyline
} from '../../utils/kakaoMapUtils';
import ToggleSwitch from './ToggleSwitch';
import cardPanelStyles from '../../styles/CardPanel.module.css';
import styles from '../../styles/GPSPage.module.css';
import { useLocation } from 'react-router-dom';
import PanelHeader from '../PanelHeader';

function KakaoMapPanel({ title }) {
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);
  const [dragState, setDragState] = useState(true);
  const { gpsData } = useContext(SocketContext);
  const [path, setPath] = useState([]); // 경로 좌표 배열
  const [polyline, setPolyline] = useState(null); // 폴리라인 객체
  const location = useLocation();

  // 지도 초기화
  async function initMap() {
    try {
      const { kakaoMap, newMarker } = await loadKakaoMap(gpsData, dragState);
      setMap(kakaoMap);
      setMarker(newMarker);
    } catch (error) {
      console.error('카카오맵 로드 실패 : ', error);
    }
  }

  useEffect(() => {
    const container = document.getElementById('map');
    if (container) {
      while (container.firstChild) container.removeChild(container.firstChild);
    }
    initMap();
    // eslint-disable-next-line
  }, [location.pathname]);

  // GPS 데이터로 마커 위치 업데이트
  useEffect(() => {
    if (map && marker) {
      updateMarkerPosition(map, marker, gpsData, dragState);
    }
  }, [gpsData, map, marker, dragState]);

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
  function handleButtonClick() {
    if (map && marker) {
      const newDragState = !dragState;
      setDragState(newDragState);
      marker.setDraggable(newDragState);
      map.setDraggable(newDragState);
    }
  }

  // title, autoScroll, setAutoScroll, toggleSwitchLabel

  return (
    <div className={cardPanelStyles.cardPanel}>
      <PanelHeader
        title="지도"
        toggleChecked={dragState}
        onToggleChange={handleButtonClick}
        toggleSwitchLabel="마커 기준 고정"
      />
      <div id="map" key={location.pathname} className={styles.mapContainer}></div>
    </div>
  );
}

export default KakaoMapPanel;
