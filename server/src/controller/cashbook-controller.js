import { Router } from 'express';
import isAuthenticate from '../middleware/is-authenticate.js';
import { cashBookService } from '../service/cashbook-service.js';
import wrapAsync from '../utils/wrap-async.js';

class CashBookController {
  constructor() {
    this.router = Router();
  }

  configureRoutes() {
    this.router.get('/', isAuthenticate, wrapAsync(this.getCashbooks.bind(this)));
    this.router.post('/', isAuthenticate, wrapAsync(this.createCashbook.bind(this)));
    this.router.patch('/:id', isAuthenticate, wrapAsync(this.updateCashbook.bind(this)));

    return this.router;
  }

  async getCashbooks(req, res) {
    let datas;
    const user_id = req.user_id;
    const { year, month, category } = req.query;
    if (category) {
      datas = await cashBookService.getCashbooksDataFromCategory(user_id, year, month, category);
    } else {
      datas = await cashBookService.getCashbooksData(user_id, year, month);
    }
    res.status(200).json(datas);
  }

  async createCashbook(req, res) {
    const user_id = req.user_id;
    const body = req.body;
    await cashBookService.createCashbook(user_id, body);
    res.sendStatus(201);
  }

  async updateCashbook(req, res) {
    const user_id = req.user_id;
    const { id } = req.params;
    const body = req.body;
    await cashBookService.updateCashbook(user_id, id, body);
    res.sendStatus(200);
  }
}

export const cashBookController = new CashBookController();
