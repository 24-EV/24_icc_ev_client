import { useContext } from 'react';
import HistoryContext from '../context/HistoryContext';

export default function useHistory() {
  const ctx = useContext(HistoryContext);
  if (!ctx) throw new Error('useHistory는 HistoryProvider 내부에서만 사용해야 합니다.');
  return ctx;
}
