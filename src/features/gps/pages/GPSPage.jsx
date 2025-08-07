import React, { useContext, useEffect, useRef, useState } from 'react';
import { SocketContext } from '../../../context/SocketContext';
import DataCard from '../../../components/common/DataCard';
import PageHeader from '../../../components/layout/PageHeader';
import {
  loadKakaoMap,
  updateMarkerPosition,
  addMarkerPath,
  drawPolyline
} from '../utils/kakaoMapUtils';
import useHistory from '../../../hooks/useHistory';
import { useLocation } from 'react-router-dom';
import KakaoMapPanel from '../components/KakaoMapPanel';
import PageLayout from '../../../components/layout/PageLayout';

// latest에서 숫자 좌표만 안전 추출
function pickLatestCoords(latest) {
  const lat = latest?.lat?.value;
  const lng = latest?.lng?.value;
  const ok =
    typeof lat === 'number' &&
    typeof lng === 'number' &&
    Number.isFinite(lat) &&
    Number.isFinite(lng);
  return ok ? { lat, lng } : { lat: null, lng: null };
}

function GPSPage() {
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);
  const [dragState, setDragState] = useState(true);
  const [path, setPath] = useState([]);
  const [polyline, setPolyline] = useState(null);

  const { history } = useHistory();
  const location = useLocation();
  const gpsHistory = Array.isArray(history) ? history.map((h) => h.gps) : [];
  const latest = gpsHistory[gpsHistory.length - 1];

  const { lat: latestLat, lng: latestLng } = pickLatestCoords(latest);
  const hasValidLatest = latestLat != null && latestLng != null;

  // StrictMode에서 최초 마운트 시 이펙트 2회 호출 방지
  const didInitRef = useRef(false);

  // 라우트 변경 시 지도 컨테이너 정리 + 1회만 초기화
  useEffect(() => {
    if (didInitRef.current) return;
    didInitRef.current = true;

    const container = document.getElementById('map');
    if (container) while (container.firstChild) container.removeChild(container.firstChild);

    (async () => {
      try {
        const initCoords = hasValidLatest ? { lat: latestLat, lng: latestLng } : undefined;
        const { kakaoMap, newMarker } = await loadKakaoMap(initCoords, dragState);
        setMap(kakaoMap);
        setMarker(newMarker);
      } catch (e) {
        console.error('카카오맵 로드 실패:', e);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  // latest 좌표로 마커 위치 업데이트
  useEffect(() => {
    if (map && marker && hasValidLatest) {
      updateMarkerPosition(map, marker, { lat: latestLat, lng: latestLng }, dragState);
    }
  }, [map, marker, dragState, hasValidLatest, latestLat, latestLng]);

  // 경로 누적
  useEffect(() => {
    if (hasValidLatest) {
      setPath((prev) => addMarkerPath({ lat: latestLat, lng: latestLng }, prev));
    }
  }, [hasValidLatest, latestLat, latestLng]);

  // 폴리라인 갱신
  useEffect(() => {
    if (!map || path.length < 2) return;
    const newPolyline = drawPolyline(map, path, polyline);
    if (newPolyline) setPolyline(newPolyline);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map, path]);

  return (
    <PageLayout
      header={<PageHeader title="GPS" />}
      data={latest}
      mainPanel={<KakaoMapPanel title="지도" />}
    />
  );
}

export default GPSPage;
