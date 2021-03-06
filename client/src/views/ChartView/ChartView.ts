import { MainChartState } from '../../types';
import { HistoryState, CashbookType } from 'types';
import { DAY_OF_THE_WEEK } from '../../constants/days';
import { CATEGORY_COLOR } from '../../constants/category';
import BarChart from '../../components/BarChart/BarChart';
import DonutChart from '../../components/DonutChart/DonutChart';
import LineChart from '../../components/LineChart/LineChart';
import Model from '../../models/model';
import Component from '../../utils/Component';
import { listenByElement } from '../../utils/customEvent';
import './chartView.scss';

export default class ChartView extends Component<MainChartState> {
  constructor($target: HTMLElement, state: MainChartState) {
    super($target, state);
    Model.subscribe('updateHistory', (data: MainChartState) => {
      if (data.path !== '/chart') return;
      this.setState(data);
    });
  }

  mounted(): void {
    if (this.state) {
      const $chartContainer = document.querySelector('.chart-container') as HTMLElement;
      const $donutContainer = document.querySelector('.donut-chart-container');
      const $barContainer = document.querySelector('.bar-chart-container') as HTMLElement;
      const $lineContainer = document.querySelector('.line-chart-container') as HTMLElement;
      const $expenditureList = document.querySelector('.expenditure-list') as HTMLUListElement;
      new DonutChart($donutContainer as HTMLElement, this.state);
      new BarChart($barContainer as HTMLElement, this.state);

      const { year, month } = this.state;
      listenByElement($barContainer, 'categoryBar-click', (e) => {
        const category = e.detail.category;
        const expenditureCategory = this.getExpenditureCategory(category);
        $lineContainer.style.display = 'flex';
        $expenditureList.style.display = 'block';
        new LineChart($lineContainer, {
          year,
          month,
          category,
        });
        this.registerCashbookToList($expenditureList, expenditureCategory, category);
        this.scrollToBottom($lineContainer);
      });
    }
  }

  template(): string {
    if (this.state) {
      return `
      <div class="chart-container">
        <div class="main-chart-container">
          <div class="donut-chart-container"></div>
          <div class="bar-chart-container"></div>
        </div>
        <div class="line-chart-container"></div>
        <ul class="expenditure-list"></ul>
      </div>`;
    }
    return '';
  }

  scrollToBottom($target: HTMLElement) {
    window.scrollTo({
      top: $target.offsetHeight,
      behavior: 'smooth',
    });
  }

  getExpenditureCategory(category: string): CashbookType[] {
    const { year, month } = this.state;
    return [
      {
        id: 1,
        category: '??????/??????',
        categoryType: 'expenditure',
        memo: '????????????????????? ?????? ??????',
        payment: '????????????',
        price: -10900,
        date: '2021-08-15',
      },
      {
        id: 2,
        category: '??????',
        categoryType: 'expenditure',
        memo: '?????? ????????? ??????',
        payment: '????????????',
        price: -45340,
        date: '2021-08-15',
      },
      {
        id: 3,
        category: '??????',
        categoryType: 'expenditure',
        memo: '7??? ??????',
        payment: '??????',
        price: -60000,
        date: '2021-08-14',
      },
    ];
  }

  registerCashbookToList($list: HTMLUListElement, expenditureCategory: CashbookType[], category: string) {
    $list.innerHTML = '';
    const year = this.state.year as number;
    let month = String(this.state.month);
    if (Number(month) < 10) month = '0' + month;
    let animationIndex = 1;
    for (let i = 31; i >= 1; i--) {
      const cashbooks = expenditureCategory.filter((cashbook) => cashbook.date === `${year}-${month}-${i}`);
      if (cashbooks.length === 0) continue;
      const dayIndex = new Date(year, Number(month) - 1, i).getDay();

      const li = document.createElement('li');
      li.innerHTML = `
        <div class="header">
          <div class="date">
            <label>${month}??? ${i}???</label>
            <label>${DAY_OF_THE_WEEK[dayIndex]}</label>
          </div>
        </div>
        <ul class="cashbook-items"></ul>
      `;
      const $header = li.querySelector('.header') as HTMLElement;
      $header.style.animationDuration = String(animationIndex++ * 500) + 'ms';

      const $cashBookitems = li.querySelector('.cashbook-items') as HTMLUListElement;
      cashbooks.forEach((cashbook) => {
        const $cashbookItem = document.createElement('li') as HTMLLIElement;
        $cashbookItem.style.animationDuration = String(animationIndex++ * 500) + 'ms';
        $cashbookItem.innerHTML = `
          <div class="category" style="background-color: ${CATEGORY_COLOR[cashbook.category]}">${
          cashbook.category
        }</div>
          <div class="memo">${cashbook.memo}</div>
          <div class="payment">${cashbook.payment}</div>
          <div class="price ${cashbook.categoryType}">${cashbook.price.toLocaleString()}</div>
        `;
        $cashBookitems.appendChild($cashbookItem);
      });

      $list.appendChild(li);
    }
  }
}
