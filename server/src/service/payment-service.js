import { BadRequestError, ForbiddenError } from '../errors/client-errors.js';
import { paymentRepository } from '../repository/payment-repository.js';
import isStringType from '../utils/is-string-type.js';

class PaymentService {
  async getPaymentsById(user_id) {
    const datas = await paymentRepository.findAllById(user_id);
    return datas;
  }

  async createPayment(user_id, name) {
    isStringType(name);
    await this.isDuplicate(user_id, name);
    await paymentRepository.createPayment(user_id, name);
  }

  async deletePayment(user_id, payment_id) {
    await this.isMine(user_id, payment_id);
    await paymentRepository.deletePayment(payment_id);
  }

  async isMine(user_id, payment_id) {
    const payment_user_id = await paymentRepository.findOwnerByPaymentId(payment_id);
    if (user_id !== payment_user_id) throw new ForbiddenError('삭제할 권한이 없습니다.');
  }

  async isDuplicate(user_id, name) {
    const payment = await paymentRepository.findOneByName(user_id, name);
    if (payment) throw new BadRequestError('중복된 카드 이름 입니다.');
  }
}

export const paymentService = new PaymentService();
