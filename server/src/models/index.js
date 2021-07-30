import WoowahanORM from 'woowahan-orm';
import User from './User.js';
import CashBook from './CashBook.js';
import Payment from './Payment.js';
import { dbConfig } from '../config/db.js';

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
  await User.init();
  await CashBook.init();
  await Payment.init();
}

export default initDB;
