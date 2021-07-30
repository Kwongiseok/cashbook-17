import { cashBookRepository } from '../repository/CashBookRepository.js';

class CashBookService {
  async getMainChart(id, year, month) {
    const datas = await cashBookRepository.findAllExpenditureByMonth(id, year, month);
    return datas;
  }
}

export const cashBookService = new CashBookService();
