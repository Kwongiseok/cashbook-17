import { category } from '../constants/category.js';
import { INVALID_DATA } from '../constants/client-error-name.js';
import { BadRequestError } from '../errors/client-errors.js';

export function validateCashBookToCreate(body) {
  const dummyCashbook = {
    category: '',
    category_type: '',
    memo: '',
    payment: '',
    price: 0,
    date: new Date(),
  };
  validateCashbook(body);
}

export function validateCashbook(body) {
  Object.keys(body).forEach((key) => {
    if (key === 'category') {
      if (category.includes(body[key])) return;
    } else if (key === 'category_type') {
      if (body[key] === 'income' || body[key] === 'expenditure') return;
    } else if (key === 'memo') {
      if (typeof body[key] === 'string' && body[key].length > 0) return;
    } else if (key === 'payment') {
      if (typeof body[key] === 'string' && body[key].length > 0) return;
    } else if (key === 'price') {
      if (typeof body[key] === 'number') return;
    } else if (key === 'date') {
      if (typeof body[key] === 'string' && new Date(body[key]) !== 'Invalid Date') return;
    }
    throw new BadRequestError(INVALID_DATA);
  });
}
