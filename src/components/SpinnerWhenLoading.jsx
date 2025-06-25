import React from 'react';
import Spinner from '../assets/Spinner.gif';
import styles from '../styles/SpinnerWhenLoading.module.css';

function SpinnerWhenLoading() {
  return (
    <div className={styles.background}>
      <img src={Spinner} alt="로딩 중" className={styles.spinnerImg} />
      Loading
    </div>
  );
}

export default SpinnerWhenLoading;
