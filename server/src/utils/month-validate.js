export default function validateMonth(month) {
  if (month < 1 || month > 12) {
    throw new BadRequestError('날짜가 올바르지 않은 접근입니다.');
  }
}
