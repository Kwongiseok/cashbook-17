import { BadRequestError } from '../errors/client-errors.js';

export default function isStringType(str) {
  if (typeof str !== 'string') {
    throw new BadRequestError('문자열 타입이 입력되어야 합니다.');
  }
}
