export const ONE_HOUR_MS = 30 * 60 * 1000;

// 중복 제거 (같은 timestamp는 마지막 값만 유지)
export function dedupeRecentData(dataArr) {
  const map = new Map();
  dataArr.forEach((item) => {
    if (item && item.timestamp) {
      map.set(item.timestamp, item);
    }
  });
  return Array.from(map.values());
}

// 최근 1시간 이내의 데이터만 유지
export function filterRecentData(dataArr, now = Date.now(), windowMs = ONE_HOUR_MS) {
  const filtered = dataArr.filter((item) => {
    if (!item || !item.timestamp) return false;
    const t = new Date(item.timestamp).getTime();
    if (isNaN(t)) return false;
    return now - t <= windowMs;
  });
  return dedupeRecentData(filtered);
}
