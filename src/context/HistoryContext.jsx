import React, { createContext, useState, useEffect, useCallback } from 'react';
import { filterRecentData, ONE_HOUR_MS } from '../utils/history/historyUtils';

const HistoryContext = createContext();

const STORAGE_KEY = 'history';

export function HistoryProvider({ children }) {
  const [history, setHistory] = useState([]);

  // 앱 시작 시 localStorage에서 불러오기
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    setHistory(saved);
  }, []);

  // 새 데이터 추가 (1시간 이내만 유지)
  const addHistory = useCallback((data) => {
    if (!data || !data.timestamp) return (prev) => prev; // 무효 데이터 무시
    setHistory((prev) => {
      const updated = [...prev, data];
      const filtered = filterRecentData(updated);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
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
