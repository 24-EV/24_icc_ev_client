/**
 * @vitest-environment jsdom
 */
import { renderHook, act } from '@testing-library/react';
import { useSocketData } from '../hooks/useSocketData';
import { describe, it, expect, vi } from 'vitest';

vi.mock('socket.io-client', () => ({
  io: () => ({
    on: vi.fn(),
    emit: vi.fn(),
    close: vi.fn(),
  }),
}));

describe('useSocketData', () => {
  it('초기값이 올바른지 확인', () => {
    const { result } = renderHook(() => useSocketData('ws://localhost:2004'));
    expect(result.current).toHaveProperty('loading', true);
    expect(result.current).toHaveProperty('vehicleData', null);
    expect(result.current).toHaveProperty('hvData', null);
    expect(result.current).toHaveProperty('motorData', null);
    expect(result.current).toHaveProperty('gpsData', null);
    expect(result.current).toHaveProperty('realTimeClock', null);
    expect(result.current).toHaveProperty('socketError', null);
    expect(result.current).toHaveProperty('isConnected', false);
  });
});
