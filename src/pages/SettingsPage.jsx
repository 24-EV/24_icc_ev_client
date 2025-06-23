import React, { useState } from 'react';
import axios from 'axios'; // axios 임포트
import commonStyles from '../styles/style'; // 공통 스타일 가져오기
import DownloadExcelComponent from '../components/DownloadExcelForm';

function SettingPage() {
  return (
    <div>
      <DownloadExcelComponent />
    </div>
  );
}

export default SettingPage;
