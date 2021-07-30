import CashBook from '../models/CashBook.js';

class CashBookRepository {
  async findAllExpenditureByMonth(id, year, month) {
    const rawWhere = `year(date)=${year} AND month(date)=${month}`;
    const datas = await CashBook.findAll({
      attributes: 'category, price',
      where: {
        user_id: id,
        category_type: 'EXPENDITURE',
      },
      rawWhere,
    });
    return datas;
  }
}

export const cashBookRepository = new CashBookRepository();
