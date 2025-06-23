import React, { useState } from 'react';
import axios from 'axios'; // axios 임포트
import DownloadExcelComponent from '../components/DownloadExcelForm';

function SettingPage() {
  return (
    <div>
      <DownloadExcelComponent />
    </div>
  );
}

export default SettingPage;
