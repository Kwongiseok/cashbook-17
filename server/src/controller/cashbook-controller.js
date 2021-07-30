import { Router } from 'express';

class CashBookController {
  constructor() {
    this.router = Router();
  }

  configureRoutes() {
    return this.router;
  }
}

export const cashBookController = new CashBookController();
