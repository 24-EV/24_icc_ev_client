import React, { useCallback, useEffect, useState } from 'react';

function GPS({ data }) {
    const [map, setMap] = useState(null);
    const [marker, setMarker] = useState(null);
    const [dragState, setDragState] = useState(true);

    const kakao = window.kakao;

    let linePath = [
        new kakao.maps.LatLng(data.lat, data.lng),
    ]

    const polyline = new kakao.maps.Polyline({
        path: linePath, // 선을 구성하는 좌표배열 입니다
        strokeWeight: 5, // 선의 두께 입니다
        strokeColor: "#FFAE00", // 선의 색깔입니다
        strokeOpacity: 0.7, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
        strokeStyle: "solid", // 선의 스타일입니다
    });


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

    }, []);

    const makeLine = useCallback(
        function (position) {
            let linePath = position;

            let polyline = new kakao.maps.polyline({
                path: linePath,
                strokeWeight: 5,
                strokeColor: "0000ff",
                strokeOpacity: 0.7,
                strokeStyle: "solid"
            });

            polyline.setMap(map);
    }, [map]);

    useEffect(() => {
        if (map && marker && data && data.lat && data.lng) {
            const kakao = window.kakao;
            const newPosition = new kakao.maps.LatLng(data.lat, data.lng);

            marker.setPosition(newPosition);

            if (dragState) {
                map.setCenter(newPosition);
            }
        }
    }, [data, map, marker]);

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
            <div id="map" style={{ width: '700px', height: '700px' }}></div>
            <button onClick={handleButtonClick}>
                지도 마커 기준 고정
            </button>
            <span>
                {dragState ? "ON" : "OFF"}
            </span>
        </div>
    );
}

export default GPS;
