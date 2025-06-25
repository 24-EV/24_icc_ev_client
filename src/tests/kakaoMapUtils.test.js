import { addMarkerPath } from '../utils/kakaoMapUtils';
import { describe, it, expect } from 'vitest';

describe('addMarkerPath', () => {
  it('좌표가 없으면 undefined를 반환한다', () => {
    expect(addMarkerPath(null, [])).toBeUndefined();
    expect(addMarkerPath(undefined, [])).toBeUndefined();
  });

  it('이전 경로가 비어있으면 새 좌표를 추가한다', () => {
    const gpsData = { lat: 37.1, lng: 127.1 };
    const result = addMarkerPath(gpsData, []);
    expect(result).toEqual([{ lat: 37.1, lng: 127.1 }]);
  });

  it('마지막 좌표와 같으면 추가하지 않는다', () => {
    const gpsData = { lat: 37.1, lng: 127.1 };
    const prevPath = [{ lat: 37.1, lng: 127.1 }];
    const result = addMarkerPath(gpsData, prevPath);
    expect(result).toBe(prevPath);
  });

  it('마지막 좌표와 다르면 새 좌표를 추가한다', () => {
    const gpsData = { lat: 37.2, lng: 127.2 };
    const prevPath = [{ lat: 37.1, lng: 127.1 }];
    const result = addMarkerPath(gpsData, prevPath);
    expect(result).toEqual([
      { lat: 37.1, lng: 127.1 },
      { lat: 37.2, lng: 127.2 },
    ]);
  });
});
