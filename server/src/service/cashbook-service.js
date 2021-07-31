import { BadRequestError, ForbiddenError } from '../errors/client-errors.js';
import { cashBookRepository } from '../repository/cashbook-repository.js';
import { validateCashbook, validateCashBookToCreate } from '../utils/cashbook-validate.js';
import validateMonth from '../utils/month-validate.js';

class CashBookService {
  async createCashbook(user_id, body) {
    validateCashBookToCreate(body);
    await cashBookRepository.createCashbook(user_id, body);
  }

  async getCashbooksData(user_id, year, month) {
    validateMonth(month);
    const datas = await cashBookRepository.findAllByMonth(user_id, year, month);
    return datas;
  }

  async getCashbooksDataFromCategory(user_id, year, month, category) {
    validateMonth(month);
    const datas = await cashBookRepository.findAllByCategory(user_id, year, month, category);
    return datas;
  }

  async getMainChartData(user_id, year, month) {
    validateMonth(month);
    const returnDatas = [];
    const datas = await cashBookRepository.findAllExpenditureByMonth(user_id, year, month);
    const category = {};
    let totalPrice = 0;
    datas.forEach((item) => {
      totalPrice += item.price;
      if (category[item.category]) {
        category[item.category].total += item.price;
      } else {
        category[item.category] = {
          total: item.price,
        };
      }
    });
    Object.keys(category).forEach((key) => {
      const { total } = category[key];
      returnDatas.push({ category: key, total, percent: this.convertToPercent(totalPrice, total) });
    });
    returnDatas.sort((a, b) => b.percent - a.percent);
    return returnDatas;
  }

  async updateCashbook(user_id, cashbook_id, body) {
    await this.isMine(user_id, cashbook_id);
    validateCashbook(body);
    await cashBookRepository.updateCashbook(cashbook_id, body);
  }

  async isMine(user_id, cashbook_id) {
    const cashbook_user_id = await cashBookRepository.findOwnerById(cashbook_id);
    if (user_id !== cashbook_user_id) throw new ForbiddenError('권한이 없습니다.');
  }
  convertToPercent(totalPrice, targetPrice) {
    const number = (targetPrice / totalPrice).toFixed(2);
    return number * 100;
  }
}

export const cashBookService = new CashBookService();
