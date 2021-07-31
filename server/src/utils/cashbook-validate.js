import { INVALID_DATA } from '../constants/client-error-name';
import { BadRequestError } from '../errors/client-errors';

export default function validateCashbook(body) {
  Object.keys(body).forEach((key) => {
    if (key === 'category') {
      if (typeof body[key] === String && body[key].length > 0) return;
    } else if (key === 'category_type') {
      if (body[key] === 'income' || body[key] === 'expenditure') return;
    } else if (key === 'memo') {
      if (typeof body[key] === String && body[key].length > 0) return;
    } else if (key === 'payment') {
      if (typeof body[key] === String && body[key].length > 0) return;
    } else if (key === 'price') {
      if (typeof body[key] === Number && price > -1) return;
    } else if (key === 'date') {
      if (typeof body[key] === String && new Date(body[key]) !== 'Invalid Date') return;
    }
    throw new BadRequestError(INVALID_DATA);
  });
}
