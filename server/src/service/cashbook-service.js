import { ForbiddenError } from '../errors/client-errors.js';
import { cashBookRepository } from '../repository/cashbook-repository.js';
import { validateCashBookToCreate, validateCashbookToUpdate } from '../utils/cashbook-validate.js';
import validateMonth from '../utils/month-validate.js';

class CashBookService {
  async createCashbook(user_id, body) {
    validateCashBookToCreate(body);
    return await cashBookRepository.createCashbook(user_id, body);
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
    const expenditureList = [];
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
      expenditureList.push({ category: key, total: -total, percent: this.convertToPercent(totalPrice, total) });
    });
    expenditureList.sort((a, b) => b.percent - a.percent);
    const returnDatas = {
      total: -totalPrice,
      datas: expenditureList,
    };
    return returnDatas;
  }

  async updateCashbook(user_id, cashbook_id, body) {
    await this.isMine(user_id, cashbook_id);
    const origin = await cashBookRepository.findOneById(cashbook_id);
    validateCashbookToUpdate(origin, body);
    await cashBookRepository.updateCashbook(cashbook_id, body);
  }

  async isMine(user_id, cashbook_id) {
    const cashbook_user_id = await cashBookRepository.findOwnerById(cashbook_id);
    if (user_id !== cashbook_user_id) throw new ForbiddenError('????????? ????????????.');
  }

  convertToPercent(totalPrice, targetPrice) {
    const number = (targetPrice / totalPrice).toFixed(2);
    const value = Math.round(number * 100);
    return value;
  }
}

export const cashBookService = new CashBookService();
