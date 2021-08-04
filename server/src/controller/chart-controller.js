import { Router } from 'express';
import isAuthenticate from '../middleware/is-authenticate.js';
import { cashBookService } from '../service/cashbook-service.js';
import wrapAsync from '../utils/wrap-async.js';

class ChartController {
  constructor() {
    this.router = Router();
  }

  configureRoutes() {
    this.router.get('/cashbooks', isAuthenticate, wrapAsync(this.getMainChart.bind(this)));
    return this.router;
  }

  async getMainChart(req, res, _next) {
    const { year, month, category } = req.query;
    const user_id = req.user_id;
    let datas;
    if (category) {
      datas = await cashBookService.getExpenditureByCategory(user_id, year, month, category);
    } else {
      datas = await cashBookService.getMainChartData(user_id, year, month);
    }
    res.status(200).json(datas);
  }
}

export const chartController = new ChartController();
