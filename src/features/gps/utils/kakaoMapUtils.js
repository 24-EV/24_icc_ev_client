// 카카오맵 유틸 - 중복 load 방지 + 좌표 유효성 강화

const DEFAULT_COORDS = { lat: 37.01219267534181, lng: 127.08870196277597 };

// 1) maps.load를 단 한 번만 실행하도록 Promise 캐시
let kakaoReadyPromise = null;
function ensureKakaoReady() {
  if (!(window.kakao && window.kakao.maps)) {
    throw new Error('Kakao Maps API가 로드되지 않았습니다.');
  }
  if (!kakaoReadyPromise) {
    kakaoReadyPromise = new Promise((resolve) => {
      window.kakao.maps.load(() => {
        console.log('Kakao Maps 로드 완료');
        resolve();
      });
    });
  }
  return kakaoReadyPromise;
}

// 2) 좌표 안전 추출: 0도 허용, null/NaN만 배제
function getCoords(data) {
  const lat = data?.lat;
  const lng = data?.lng;
  const ok =
    typeof lat === 'number' &&
    typeof lng === 'number' &&
    Number.isFinite(lat) &&
    Number.isFinite(lng);
  return ok ? { lat, lng } : DEFAULT_COORDS;
}

// 카카오맵 초기화 및 마커 생성
async function loadKakaoMap(gpsData, dragState = true, mapId = 'map') {
  await ensureKakaoReady();

  const coords = getCoords(gpsData);

  const container = document.getElementById(mapId);
  if (!container) throw new Error(`지도 컨테이너(#${mapId})를 찾을 수 없음`);

  // 맵 초기화
  const options = {
    center: new window.kakao.maps.LatLng(coords.lat, coords.lng),
    level: 3,
  };
  const kakaoMap = new window.kakao.maps.Map(container, options);

  // 마커 생성
  const newMarker = new window.kakao.maps.Marker({
    position: options.center,
    draggable: dragState,
  });
  newMarker.setMap(kakaoMap);

  return { kakaoMap, newMarker };
}

function updateMarkerPosition(map, marker, gpsData, dragState = true) {
  const coords = getCoords(gpsData);
  if (!map || !marker) return;

  const newPosition = new window.kakao.maps.LatLng(coords.lat, coords.lng);
  marker.setPosition(newPosition);
  if (dragState) map.setCenter(newPosition);
}

function addMarkerPath(
  gpsData = DEFAULT_COORDS,
  prevPath = []
) {
  const coords = getCoords(gpsData);

  if (prevPath.length > 0) {
    const last = prevPath[prevPath.length - 1];
    if (last.lat === coords.lat && last.lng === coords.lng) {
      return prevPath; // 동일 좌표면 누적 안 함
    }
  }
  return [...prevPath, { lat: coords.lat, lng: coords.lng }];
}

function drawPolyline(map, path, polyline) {
  if (!map || path.length < 2) return polyline;

  const linePath = path.map(
    (pos) => new window.kakao.maps.LatLng(pos.lat, pos.lng)
  );

  // 기존 폴리라인 제거
  if (polyline) polyline.setMap(null);

  // 새 폴리라인
  const newPolyline = new window.kakao.maps.Polyline({
    path: linePath,
    strokeWeight: 4,
    strokeColor: '#FF0000',
    strokeOpacity: 0.8,
    strokeStyle: 'solid',
  });
  newPolyline.setMap(map);
  return newPolyline;
}

export { loadKakaoMap, updateMarkerPosition, addMarkerPath, drawPolyline };
