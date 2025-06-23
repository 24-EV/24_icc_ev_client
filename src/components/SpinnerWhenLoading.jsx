import React from 'react';
import Spinner from '../assets/Spinner.gif';

function SpinnerWhenLoading() {
    return (
            <Background>
                <img src={Spinner} alt="로딩 중" width="5%" />
                Loading
            </Background>
        
    );
}

export default SpinnerWhenLoading