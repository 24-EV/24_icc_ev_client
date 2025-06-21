import React, { createContext } from 'react';
import { useSocketData } from '../hooks/useSocketData';

// Context 생성
export const SocketContext = createContext();

export function SocketProvider({ children }) {
  const socketData = useSocketData(import.meta.env.VITE_SERVER_URL);

  return <SocketContext.Provider value={socketData}>{children}</SocketContext.Provider>;
}
