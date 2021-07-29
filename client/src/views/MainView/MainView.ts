import Component from '../../utils/Component';
import Model from '../../models/model';
import DatePicker from '../../components/DatePicker/DatePicker';
import InputBar from '../../components/InputBar/InputBar';
import { HistoryState, CashcooksResponse, CashbookType } from '../../types';
import { DAY_OF_THE_WEEK } from '../../constants/days';
import { CATEGORY_COLOR } from '../../constants/category';
import { triggerByElement } from '../../utils/customEvent';
import { ROLLING_NUMBER } from '../../constants/rollingNumber';
import './mainView.scss';

const dummy: CashcooksResponse = {
  totalElements: 3,
  totalIncome: 60000,
  totalExpenditure: -55340,
  cashbooks: [
    {
      id: 1,
      category: '문화/여가',
      categoryType: 'expenditure',
      memo: '스트리밍서비스 정기 결제',
      payment: '현대카드',
      price: -10900,
      date: '2021-07-15',
    },
    {
      id: 2,
      category: '교통',
      categoryType: 'expenditure',
      memo: '후불 교통비 결제',
      payment: '현대카드',
      price: -45340,
      date: '2021-07-15',
    },
    {
      id: 3,
      category: '용돈',
      categoryType: 'income',
      memo: '7월 용돈',
      payment: '현금',
      price: 60000,
      date: '2021-07-14',
    },
  ],
};

type MainViewState = {
  path?: string;
  year?: number;
  month?: number;
  type?: string;
  incomeChecked: boolean;
  expenditureChecked: boolean;
  totalElement: number;
  totalIncome: number;
  totalExpenditure: number;
  cashbooks: CashbookType[];
};

export default class MainView extends Component<MainViewState> {
  constructor($target: HTMLElement, state: HistoryState) {
    super($target, {
      ...state,
      incomeChecked: true,
      expenditureChecked: true,
      totalElement: 0,
      totalIncome: 0,
      totalExpenditure: 0,
      cashbooks: [],
    });
    Model.subscribe('statechange', (data: HistoryState) => {
      if (data.path !== '/') return;
      this.setState(data);
      this.setCashbookData(this.state.year, this.state.month);
    });
  }
  setup() {}

  mounted() {
    const $inputBar = $('.input-bar');
    const $cashbookList = $('.cashbook-list') as HTMLUListElement;

    new InputBar($inputBar, { addCashBook: this.addCashbook.bind(this) });
    this.setCashbookList($cashbookList);
  }

  template(): string {
    return `
      <div class="main-view">
        <div class="input-bar"></div>
        <div class="content">
          <div class="header">
            <div class="total-elements">전체 내역 ${this.makeRollingNumber(String(this.getTotalElement()))}건</div>
            <div class="selector">
              <input id="checkbox-income" type="checkbox" hidden ${this.state.incomeChecked ? 'checked' : ''}>
              <label for="checkbox-income" class="checkmark"></label>
              <div class="income">
                <label>수입</label>
                ${this.makeRollingNumber(this.state.totalIncome.toLocaleString())}
              </div>

              <input id="checkbox-expenditure" type="checkbox" hidden ${this.state.expenditureChecked ? 'checked' : ''}>
              <label for="checkbox-expenditure" class="checkmark"></label>
              <div class="expenditure">
                <label>지출</label>
                ${this.makeRollingNumber(this.state.totalExpenditure.toLocaleString())}
              </div>
            </div>
          </div>
          <ul class="cashbook-list"></ul>
        </div>
      </div>
    `;
  }

  setEvent() {
    const $incomeCheckbox = this.$target.querySelector('#checkbox-income') as HTMLInputElement;
    const $expenditureCheckbox = this.$target.querySelector('#checkbox-expenditure') as HTMLInputElement;

    $incomeCheckbox?.addEventListener('change', () => {
      this.setState({
        incomeChecked: $incomeCheckbox.checked,
      });
    });
    $expenditureCheckbox?.addEventListener('change', () => {
      this.setState({
        expenditureChecked: $expenditureCheckbox.checked,
      });
    });
  }

  setCashbookData(year?: number, month?: number) {
    // 서버 요청
    const result = dummy;
    this.setState({
      totalElement: result.totalElements,
      totalIncome: result.totalIncome,
      totalExpenditure: result.totalExpenditure,
      cashbooks: result.cashbooks,
    });
  }

  getMonth() {
    return this.state.month;
  }

  getTotalElement() {
    const { incomeChecked, expenditureChecked } = this.state;
    return this.state.cashbooks.filter(
      (cashbook) =>
        (cashbook.categoryType === 'income' && incomeChecked) ||
        (cashbook.categoryType === 'expenditure' && expenditureChecked)
    ).length;
  }

  setCashbookList($cashbookList: HTMLUListElement) {
    this.registerCashbookToList($cashbookList);
  }

  registerCashbookToList($list: HTMLUListElement) {
    const year = this.state.year as number;
    let month = String(this.state.month);
    const { incomeChecked, expenditureChecked } = this.state;
    if (Number(month) < 10) month = '0' + month;
    let animationIndex = 1;
    for (let i = 31; i >= 1; i--) {
      const cashbooks = this.state.cashbooks
        .filter((cashbook) => cashbook.date === `${year}-${month}-${i}`)
        .filter(
          (cashbook) =>
            (cashbook.categoryType === 'income' && incomeChecked) ||
            (cashbook.categoryType === 'expenditure' && expenditureChecked)
        );
      if (cashbooks.length === 0) continue;
      const dayIndex = new Date(year, Number(month) - 1, i).getDay();
      const totalIncome: number = cashbooks
        .filter((cashbook) => cashbook.categoryType === 'income')
        .map((cashbook) => cashbook.price as number)
        .reduce((a, b) => a + b, 0);
      const totalExpenditure: number = cashbooks
        .filter((cashbook) => cashbook.categoryType === 'expenditure')
        .map((cashbook) => cashbook.price as number)
        .reduce((a, b) => a + b, 0);

      const li = document.createElement('li');
      li.innerHTML = `
        <div class="header">
          <div class="date">
            <label>${month}월 ${i}일</label>
            <label>${DAY_OF_THE_WEEK[dayIndex]}</label>
          </div>
          <div class="total">${this.getTotalCash(totalIncome, totalExpenditure)}</div>
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
        $cashbookItem.addEventListener('click', (e) => {
          triggerByElement($('.input-bar'), 'selectCashbook', {
            date: cashbook.date,
            category: cashbook.category,
            categoryType: cashbook.categoryType,
            price: (cashbook.price as number) * (cashbook.categoryType === 'expenditure' ? -1 : 1),
            memo: cashbook.memo,
            payment: cashbook.payment,
          });
        });
        $cashBookitems.appendChild($cashbookItem);
      });

      $list.appendChild(li);
    }
  }

  addCashbook(cashbook: CashbookType) {
    this.setState({
      cashbooks: [...this.state.cashbooks, cashbook],
    });
  }

  getTotalCash(totalIncome: number, totalExpenditure: number) {
    let result = '';
    result += totalIncome === 0 ? '' : `<label>수입 ${totalIncome.toLocaleString()}</label>`;
    result += totalExpenditure === 0 ? '' : `<label>지출 ${totalExpenditure.toLocaleString()}</label>`;
    return result;
  }

  makeRollingNumber(total: string): string {
    const convertedHTML = Array.from(total)
      .map((txt) => {
        if (this.isNumeric(txt)) {
          return `<div class="rolling-container">
            <span class="rolling-real-text">${txt}</span>
            <div class="rolling-text" style="top : ${-2000 - parseInt(txt) * 100}%;animation-duration: ${
            1000 + Math.random() * 10 * 60
          }ms;">${ROLLING_NUMBER}</div>
          </div>`;
        }
        return `<div class="not-rolling-text">${txt}</div>`;
      })
      .join('');
    return convertedHTML;
  }

  isNumeric(data: string): boolean {
    return !isNaN(Number(data));
  }
}

const $ = (query: string): HTMLElement => {
  return document.querySelector(query) as HTMLElement;
};
