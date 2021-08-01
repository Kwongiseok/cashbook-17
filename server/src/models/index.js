import WoowahanORM from '@kwongiseok/woowahan-orm';
import User from './User.js';
import CashBook from './CashBook.js';
import Payment from './Payment.js';
import { dbConfig } from '../config/db.js';
import { DatabaseError } from '../errors/base-errors.js';

async function initDB() {
  WoowahanORM(
    {
      host: dbConfig.host,
      user: dbConfig.user,
      password: dbConfig.password,
      database: dbConfig.name,
    },
    {
      sync: {
        force: false,
      },
    }
  );
  await initModel();
}

async function initModel() {
  try {
    await User.init();
    await CashBook.init();
    await Payment.init();
  } catch (error) {
    console.error();
    throw new DatabaseError('Database 초기화 에러');
  }
}

export default initDB;
