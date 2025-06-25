// 카카오맵 초기화 및 마커 생성
const DEFAULT_COORDS = { lat: 37.01219267534181, lng: 127.08870196277597 }; // ㅋㅋ 우리집 좌표

function getCoords(data) {
  return data && data.lat && data.lng ? data : DEFAULT_COORDS;
}

async function loadKakaoMap(gpsData, dragState = true) {
  if (!(window.kakao && window.kakao.maps)) {
    throw new Error('Kakao Maps API가 로드되지 않았습니다.');
  }

  const coords = getCoords(gpsData);

  const { kakaoMap, newMarker } = await new Promise(function (resolve) {
    window.kakao.maps.load(function () {
      console.log('Kakao Maps 로드 완료');

      // 지도 컨테이너
      const container = document.getElementById('map');
      const options = {
        center: new window.kakao.maps.LatLng(coords.lat, coords.lng), // 기본 위치
        level: 3
      };

      // 맵 초기화
      const kakaoMap = new window.kakao.maps.Map(container, options);

      // 마커 생성
      const newMarker = new window.kakao.maps.Marker({
        position: options.center,
        draggable: dragState
      });
      newMarker.setMap(kakaoMap);

      resolve({ kakaoMap, newMarker });
    });
  });

  return { kakaoMap, newMarker };
}

function updateMarkerPosition(map, marker, gpsData, dragState = true) {
  const coords = getCoords(gpsData);
  if (map && marker && coords.lat && coords.lng) {
    const newPosition = new window.kakao.maps.LatLng(coords.lat, coords.lng);
    marker.setPosition(newPosition);

    if (dragState) {
      map.setCenter(newPosition);
    }
  } else {
    console.log('파라미터 값 이슈로 인한 에러');
  }
}

function addMarkerPath(gpsData = { lat: 37.01219267534181, lng: 127.08870196277597 }, prevPathObj) {
  if (!gpsData) return;

  if (prevPathObj.length > 0) {
    const last = prevPathObj[prevPathObj.length - 1];
    if (last.lat === gpsData.lat && last.lng === gpsData.lng) {
      return prevPathObj;
    }
  }
  return [...prevPathObj, { lat: gpsData.lat, lng: gpsData.lng }];
}

function drawPolyline(map, path, polyline) {
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
      strokeStyle: 'solid'
    });
    newPolyline.setMap(map);

    return newPolyline;
  }
}

export { loadKakaoMap, updateMarkerPosition, addMarkerPath, drawPolyline };
