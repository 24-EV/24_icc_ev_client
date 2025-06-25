// 데이터 이력 관련 유틸 함수 모듈

export const ONE_HOUR_MS = 60 * 60 * 1000;

export function addTimestamp(data) {
  return { ...data, _ts: Date.now() };
}

export function dedupeRecentData(dataArr) {
  const map = new Map();
  dataArr.forEach((item) => {
    if (item._ts) map.set(item._ts, item); // 같은 _ts면 마지막 값으로 덮어씀
  });
  return Array.from(map.values());
}

export function filterRecentData(dataArr, now = Date.now(), windowMs = ONE_HOUR_MS) {
  // 1시간 이내 + 중복 타임스탬프 제거
  const filtered = dataArr.filter((item) => now - item._ts <= windowMs);
  return dedupeRecentData(filtered);
}
