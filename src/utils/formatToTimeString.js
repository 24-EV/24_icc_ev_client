// 시간 포맷팅 유틸 함수
export function formatToTimeString(dateString) {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleTimeString('ko-KR', { hour12: false });
}
