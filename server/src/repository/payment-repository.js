import { PAYMENT_DB_ERROR } from '../constants/database-error-name.js';
import { DatabaseError } from '../errors/base-errors.js';
import Payment from '../models/Payment.js';

class PaymentRepository {
  async findAllById(user_id) {
    try {
      const payments = await Payment.findAll({
        attributes: 'id, name',
        where: {
          user_id,
        },
      });
      return payments;
    } catch (error) {
      console.error(error);
      throw new DatabaseError(PAYMENT_DB_ERROR);
    }
  }

  async findOneByName(user_id, name) {
    try {
      const payment = await Payment.findOne({
        attributes: 'id',
        where: {
          user_id,
          name,
        },
      });
      return payment;
    } catch (error) {
      console.error(error);
      throw new DatabaseError(PAYMENT_DB_ERROR);
    }
  }

  async findOwnerByPaymentId(id) {
    try {
      const { user_id } = await Payment.findOne({
        attributes: 'user_id',
        where: {
          id,
        },
      });
      return user_id;
    } catch (error) {
      console.error(error);
      throw new DatabaseError(PAYMENT_DB_ERROR);
    }
  }

  async createPayment(user_id, name) {
    try {
      await Payment.create({
        user_id,
        name,
      });
    } catch (error) {
      console.error(error);
      throw new DatabaseError(PAYMENT_DB_ERROR);
    }
  }

  async deletePayment(id) {
    try {
      await Payment.delete(id);
    } catch (error) {
      console.error(error);
      throw new DatabaseError(PAYMENT_DB_ERROR);
    }
  }
}
export const paymentRepository = new PaymentRepository();
