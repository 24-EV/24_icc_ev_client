// 데이터 이력 관련 유틸 함수 모듈

export const ONE_HOUR_MS = 60 * 60 * 1000;

export function addTimestamp(data) {
  return { ...data, _ts: Date.now() };
}

export function filterRecentData(dataArr, now = Date.now(), windowMs = ONE_HOUR_MS) {
  return dataArr.filter((item) => now - item._ts <= windowMs);
}
