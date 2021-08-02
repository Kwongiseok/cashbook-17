import { CASHBOOK_DB_ERROR } from '../constants/database-error-name.js';
import { DatabaseError } from '../errors/base-errors.js';
import CashBook from '../models/CashBook.js';

class CashBookRepository {
  async createCashbook(user_id, body) {
    try {
      const cashbook = await CashBook.create({
        user_id,
        ...body,
      });
      return cashbook;
    } catch (error) {
      console.error(error);
      throw new DatabaseError(USER_DB_ERROR);
    }
  }
  async findAllByMonth(user_id, year, month) {
    try {
      const rawWhere = `year(date)=${year} AND month(date)=${month}`;
      const datas = await CashBook.findAll({
        attributes: '*',
        where: {
          user_id,
        },
        rawWhere,
      });
      return datas;
    } catch (error) {
      console.error(error);
      throw new DatabaseError(CASHBOOK_DB_ERROR);
    }
  }

  async findAllByCategory(user_id, year, month, category) {
    try {
      const rawWhere = `year(date)=${year} AND month(date)=${month}`;
      const datas = await CashBook.findAll({
        attributes: '*',
        where: {
          user_id,
          category,
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

  async findAllExpenditureByMonth(user_id, year, month) {
    try {
      const rawWhere = `year(date)=${year} AND month(date)=${month}`;
      const datas = await CashBook.findAll({
        attributes: 'category, price',
        where: {
          user_id,
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

  async findOneById(id) {
    try {
      const cashbook = await CashBook.findOne({
        attributes: '*',
        where: {
          id,
        },
      });
      return cashbook;
    } catch (error) {
      console.error(error);
      throw new DatabaseError(CASHBOOK_DB_ERROR);
    }
  }

  async findOwnerById(id) {
    try {
      const { user_id } = await CashBook.findOne({
        attributes: 'user_id',
        where: {
          id,
        },
      });
      return user_id;
    } catch (error) {
      console.error(error);
      throw new DatabaseError(CASHBOOK_DB_ERROR);
    }
  }

  async updateCashbook(id, body) {
    try {
      const new_body = {
        id: parseInt(id),
        ...body,
      };
      await CashBook.update(new_body);
    } catch (error) {
      console.error(error);
      throw new DatabaseError(CASHBOOK_DB_ERROR);
    }
  }
}

export const cashBookRepository = new CashBookRepository();
