import { CATEGORY, CATEGORY_TYPE, INCOME_CATEGORY } from '../constants/category.js';
import { INVALID_DATA } from '../constants/client-error-name.js';
import { BadRequestError } from '../errors/client-errors.js';

export function validateCashBookToCreate(body) {
  const bodyKeys = Object.keys(body);
  validateCashbook(body);
  if (!CATEGORY_TYPE.every((key) => bodyKeys.includes(key))) throw new BadRequestError(INVALID_DATA);
  validateCategoryType(body);
}

export function validateCashbookToUpdate(origin, update_body) {
  if (update_body.id && update_body.id !== origin.id) {
    throw new BadRequestError(INVALID_DATA);
  }
  validateCashbook(update_body);
  const new_body = { ...origin, ...update_body };
  validateCategoryType(new_body);
}

function validateCategoryType(body) {
  if (body.category_type === 'income') {
    if (!INCOME_CATEGORY.includes(body.category) || body.price < 0) {
      throw new BadRequestError(INVALID_DATA);
    }
  } else if (body.category_type === 'expenditure') {
    if (INCOME_CATEGORY.includes(body.category) || body.price > 0) {
      throw new BadRequestError(INVALID_DATA);
    }
  }
}
function validateCashbook(body) {
  Object.keys(body).forEach((key) => {
    if (key === 'category') {
      if (CATEGORY.includes(body[key])) return;
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
