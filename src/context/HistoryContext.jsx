import React, { createContext, useState, useEffect, useCallback } from 'react';
import { filterRecentData, addTimestamp, ONE_HOUR_MS } from '../utils/historyUtils';

const HistoryContext = createContext();

const STORAGE_KEY = 'history';

export function HistoryProvider({ children }) {
  const [history, setHistory] = useState([]);

  // 앱 시작 시 localStorage에서 불러오기
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    setHistory(filterRecentData(saved));
  }, []);

  // 새 데이터 추가 (타임스탬프 부여 및 1시간 이내만 유지)
  const addHistory = useCallback((data) => {
    setHistory((prev) => {
      const newItem = addTimestamp(data);
      const updated = [...prev, newItem];
      const filtered = filterRecentData(updated);
      console.log('addHistory newItem:', newItem);
      console.log('addHistory filtered:', filtered);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
      console.log('로컬스토리지 저장됨:', localStorage.getItem(STORAGE_KEY));
      return filtered;
    });
  }, []);

  // 필요시: 이력 전체 삭제
  const clearHistory = useCallback(() => {
    setHistory([]);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return (
    <HistoryContext.Provider value={{ history, addHistory, clearHistory }}>
      {children}
    </HistoryContext.Provider>
  );
}

export default HistoryContext;
