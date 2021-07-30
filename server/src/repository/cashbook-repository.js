import { CASHBOOK_DB_ERROR } from '../constants/database-error-name.js';
import { DatabaseError } from '../errors/base-errors.js';
import CashBook from '../models/CashBook.js';

class CashBookRepository {
  async findAllExpenditureByMonth(id, year, month) {
    try {
      const rawWhere = `year(date)=${year} AND month(date)=${month}`;
      const datas = await CashBook.findAll({
        attributes: 'category, price',
        where: {
          user_id: id,
          category_type: 'expenditure',
        },
        rawWhere,
      });
      return datas;
    } catch (error) {
      console.error(error);
      throw new DatabaseError(CASHBOOK_DB_ERROR);
    }
  }
}

export const cashBookRepository = new CashBookRepository();
