import WoowahanORM from 'woowahan-orm';
import dotenv from 'dotenv';
import User from './User';
import CashBook from './Cashbook';
import Payment from './Payment';

dotenv.config();

export default async function init() {
  WoowahanORM(
    {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
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
