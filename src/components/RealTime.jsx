import React, { useContext } from 'react';
import { Background, LoadingText } from './Styles';
import Spinner from '../assets/Spinner.gif';
import { SocketContext } from '../context/SocketContext';

function RealTime() {
    const { rtc_module } = useContext(SocketContext);

    return (
        <p>
            REAL TIME : {rtc_module ? rtc_module.timestamp : '데이터 없음'}
        </p>
    );
}

export default RealTime;