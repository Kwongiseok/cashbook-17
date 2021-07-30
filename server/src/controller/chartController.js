import { Router } from 'express';
import { cashBookService } from '../service/cashBookService.js';

class ChartController {
  constructor() {
    this.router = Router();
  }

  configureRoutes() {
    this.router.get('/cashbooks', this.getMainChart.bind(this));
    return this.router;
  }

  async getMainChart(req, res, next) {
    try {
      const { year, month } = req.query;
      const { user_id } = req.session;
      const datas = await cashBookService.getMainChart(user_id, year, month);
      if (datas) {
        res.status(200).json(datas);
      } else {
        res.sendStatus(200);
      }
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
}

export const chartController = new ChartController();
