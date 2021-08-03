import { Router } from 'express';
import isAuthenticate from '../middleware/is-authenticate.js';
import { paymentService } from '../service/payment-service.js';
import wrapAsync from '../utils/wrap-async.js';

class PaymentController {
  constructor() {
    this.router = Router();
  }

  configureRoutes() {
    this.router.get('/', isAuthenticate, wrapAsync(this.getPayments.bind(this)));
    this.router.post('/', isAuthenticate, wrapAsync(this.createPayment.bind(this)));
    this.router.delete('/:id', isAuthenticate, wrapAsync(this.deletePayment.bind(this)));
    return this.router;
  }

  async getPayments(req, res, next) {
    const user_id = req.user_id;
    const datas = await paymentService.getPaymentsById(user_id);
    res.status(200).json(datas);
  }

  async createPayment(req, res, next) {
    const user_id = req.user_id;
    const { name } = req.body;
    await paymentService.createPayment(user_id, name);
    res.sendStatus(201);
  }

  async deletePayment(req, res, next) {
    const user_id = req.user_id;
    const { id } = req.params;
    await paymentService.deletePayment(user_id, id);
    res.sendStatus(200);
  }
}

export const paymentController = new PaymentController();
