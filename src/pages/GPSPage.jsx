import React, { useContext, useEffect, useState } from 'react';
import { SocketContext } from '../context/SocketContext';
import DataCard from '../components/common/DataCard';
import Section from '../components/Section';
import PageHeader from '../components/PageHeader';
import styles from '../styles/GPSPage.module.css';
import cardPanelStyles from '../styles/CardPanel.module.css';
import {
  loadKakaoMap,
  updateMarkerPosition,
  addMarkerPath,
  drawPolyline
} from '../utils/kakaoMapUtils';
import useHistory from '../hooks/useHistory';
import { useLocation } from 'react-router-dom';
import ToggleSwitch from '../components/common/ToggleSwitch';

function GPSPage() {
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);
  const [dragState, setDragState] = useState(true);
  const { gpsData } = useContext(SocketContext);
  const [path, setPath] = useState([]); // 경로 좌표 배열
  const [polyline, setPolyline] = useState(null); // 폴리라인 객체
  const [isPressed, setIsPressed] = useState(false);
  const { history } = useHistory();
  const gpsHistory = history.map((h) => h.gpsData);
  const location = useLocation();
  const DEFAULT_COORDS = { lat: 37.01219267534181, lng: 127.08870196277597 };

  async function initMap() {
    try {
      const { kakaoMap, newMarker } = await loadKakaoMap(gpsData, dragState);
      setMap(kakaoMap);
      setMarker(newMarker);
    } catch (error) {
      console.error('카카오맵 로드 실패 : ', error);
    }
  }

  useEffect(
    function () {
      const container = document.getElementById('map');
      if (container) {
        // 모든 자식 노드 완전 제거
        while (container.firstChild) container.removeChild(container.firstChild);
      }
      initMap();
    },
    [location.pathname]
  );

  // GPS 데이터로 마커 위치 업데이트
  useEffect(
    function () {
      if (map && marker) {
        updateMarkerPosition(map, marker, gpsData, dragState);
      }
    },
    [gpsData, map, marker, dragState]
  );

  // gpsData 들어올 때마다 path에 추가
  useEffect(
    function () {
      if (gpsData && gpsData.lat && gpsData.lng) {
        setPath((prevPath) => addMarkerPath(gpsData, prevPath));
      }
    },
    [gpsData]
  );

  // path가 바뀔 때마다 폴리라인 그리기
  useEffect(
    function () {
      if (!map || path.length < 2) return;
      const newPolyline = drawPolyline(map, path, polyline);
      if (newPolyline) {
        setPolyline(newPolyline);
      }
    },
    [map, path]
  );

  // 버튼 클릭시 마커 드래그 상태 변경
  function handleButtonClick() {
    if (map && marker) {
      const newDragState = !dragState;
      setDragState(newDragState);
      marker.setDraggable(newDragState);
      map.setDraggable(newDragState);
    }
  }

  return (
    <Section>
      <div className={styles.topRow} style={{ marginTop: '2vw' }}>
        <div className={styles.titleWrap}>
          <PageHeader title="GPS" />
        </div>
        <div className={styles.dataCardRow}>
          <DataCard
            label="GPS 데이터 상태"
            value={
              gpsData && gpsData.lat !== null && gpsData.lng !== null
                ? `위도: ${gpsData.lat}, 경도: ${gpsData.lng}`
                : 'GPS 데이터 없음'
            }
            unit=""
          />
        </div>
      </div>
      <div className={cardPanelStyles.cardPanel + ' ' + styles.panelRow}>
        <div id="map" key={location.pathname} className={styles.mapContainer}></div>
        <div className={styles.buttonWrap}>
          <ToggleSwitch
            checked={dragState}
            onChange={handleButtonClick}
            label="지도 마커 기준 고정"
          />
        </div>
      </div>
    </Section>
  );
}

export default GPSPage;
