import { cashBookRepository } from '../repository/CashBookRepository.js';

class CashBookService {
  async getMainChartData(id, year, month) {
    const returnDatas = [];
    const datas = await cashBookRepository.findAllExpenditureByMonth(id, year, month);
    const category = {};
    let totalPrice = 0;
    datas.forEach((item) => {
      console.log(item, item.category, item.price);
      totalPrice += item.price;
      if (category[item.category]) {
        category[item.category].total += item.price;
      } else {
        category[item.category] = {
          total: item.price,
        };
      }
    });
    Object.keys(category).forEach((key) => {
      const { total } = category[key];
      returnDatas.push({ category: key, total, percent: this.convertToPercent(totalPrice, total) });
    });
    returnDatas.sort((a, b) => b.percent - a.percent);
    return returnDatas;
  }

  convertToPercent(totalPrice, targetPrice) {
    const number = (targetPrice / totalPrice).toFixed(2);
    return number * 100;
  }
}

export const cashBookService = new CashBookService();