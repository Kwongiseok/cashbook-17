import { Router } from 'express';
import isAuthenticate from '../middleware/is-authenticate.js';
import { cashBookService } from '../service/cashbook-service.js';

class ChartController {
  constructor() {
    this.router = Router();
  }

  configureRoutes() {
    this.router.get('/cashbooks', isAuthenticate, this.getMainChart.bind(this));
    return this.router;
  }

  async getMainChart(req, res, next) {
    try {
      const { year, month } = req.query;
      const user_id = req.user_id;
      const datas = await cashBookService.getMainChartData(user_id, year, month);
      res.status(200).json(datas);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
}

export const chartController = new ChartController();
