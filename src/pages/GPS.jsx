import React, { useCallback, useContext, useEffect, useState } from 'react';
import { SocketContext } from '../context/SocketContext';

function GPS() {
    const [map, setMap] = useState(null);
    const [marker, setMarker] = useState(null);
    const [dragState, setDragState] = useState(true);
   
    const { gpsData } = useContext(SocketContext);
    
    const kakao = window.kakao;

    let linePath = gpsData ? [
        new kakao.maps.LatLng(gpsData.lat, gpsData.lng),
    ] : [];

    const polyline = new kakao.maps.Polyline({
        path: linePath, // 선을 구성하는 좌표 배열
        strokeWeight: 5, // 선의 두께
        strokeColor: "#FFAE00", // 선의 색깔
        strokeOpacity: 0.7, // 선의 불투명도 (1에서 0 사이의 값)
        strokeStyle: "solid", // 선의 스타일
    });

    // 지도를 초기화하는 useEffect
    useEffect(() => {
        const container = document.getElementById('map');
        const options = {
            center: new kakao.maps.LatLng(33.450701, 126.570667),
            level: 3
        };

        const kakaoMap = new kakao.maps.Map(container, options);
        setMap(kakaoMap);

        const newMarker = new kakao.maps.Marker({
            position: options.center,
            draggable: dragState
        });
        newMarker.setMap(kakaoMap);
        setMarker(newMarker);

    }, []); // 빈 배열을 넣어 한 번만 실행되도록 설정

    // polyline을 생성하는 함수
    const makeLine = useCallback(
        (position) => {
            let linePath = position;

            let polyline = new kakao.maps.Polyline({
                path: linePath,
                strokeWeight: 5,
                strokeColor: "0000ff",
                strokeOpacity: 0.7,
                strokeStyle: "solid"
            });

            polyline.setMap(map);
        },
        [map]
    );

    // GPS 데이터를 기반으로 마커와 맵을 업데이트하는 useEffect
    useEffect(() => {
        if (map && marker && gpsData && gpsData.lat && gpsData.lng) {
            const kakao = window.kakao;
            const newPosition = new kakao.maps.LatLng(gpsData.lat, gpsData.lng);

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
        <div className='gps-container'>
            <h1>GPS</h1>
            <div id="map" style={{ width: '300px', height: '300px' }}></div>
            <button onClick={handleButtonClick}>
                지도 마커 기준 고정
            </button>
            <span>
                {dragState ? "ON" : "OFF"}
            </span>
            {!gpsData && <div>데이터가 없습니다.</div>}
        </div>
    );
}

export default GPS;
