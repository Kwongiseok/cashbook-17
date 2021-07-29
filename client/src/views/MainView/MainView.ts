import Component from '../../utils/Component';
import Model from '../../models/model';
import DatePicker from '../../components/DatePicker/DatePicker';
import InputBar from './InputBar/InputBar';
import { HistoryState, CashcooksResponse, CashbookType } from '../../types';
import { DAY_OF_THE_WEEK } from '../../constants/days';
import { CATEGORY_COLOR } from '../../constants/category';
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
  incomeChecked?: boolean;
  expenditureChecked?: boolean;
};

export default class MainView extends Component<MainViewState> {
  totalElement: number = 0;
  totalIncome: number = 0;
  totalExpenditure: number = 0;
  cashbooks: CashbookType[] = [];
  constructor($target: HTMLElement, state: HistoryState) {
    super($target, state);
    this.setCashbookData(state.year, state.month);
    Model.subscribe('statechange', (data: HistoryState) => {
      if (data.path !== '/') return;
      this.setState(data);
      this.setCashbookData(data.year, data.month);
    });
  }
  setup() {
    this.setCashbookData(this.state.year, this.state.month);
    this.setState({
      incomeChecked: true,
      expenditureChecked: true,
    });
  }

  mounted() {
    const $inputBar = $('.input-bar');
    const $cashbookList = $('.cashbook-list') as HTMLUListElement;

    new InputBar($inputBar, history.state);
    this.setCashbookList($cashbookList);
  }

  template(): string {
    return `
      <div class="main-view">
        <div class="input-bar"></div>
        <div class="content">
          <div class="header">
            <label class="total-elements">전체 내역 ${this.totalElement}건</label>
            <div class="selector">
              <input id="checkbox-income" type="checkbox" hidden ${this.state.incomeChecked ? 'checked' : ''}>
              <label for="checkbox-income" class="checkmark"></label>
              <label class="income">수입 ${this.totalIncome.toLocaleString()}</label>

              <input id="checkbox-expenditure" type="checkbox" hidden ${this.state.expenditureChecked ? 'checked' : ''}>
              <label for="checkbox-expenditure" class="checkmark"></label>
              <label class="expenditure">지출 ${this.totalExpenditure.toLocaleString()}</label>
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
    this.totalElement = result.totalElements;
    this.totalIncome = result.totalIncome;
    this.totalExpenditure = result.totalExpenditure;
    this.cashbooks = result.cashbooks;
  }

  getMonth() {
    return this.state.month;
  }

  setCashbookList($cashbookList: HTMLUListElement) {
    this.registerCashbookToList($cashbookList);
  }

  registerCashbookToList($list: HTMLUListElement) {
    const year = this.state.year as number;
    let month = String(this.state.month);
    const { incomeChecked, expenditureChecked } = this.state;
    if (Number(month) < 10) month = '0' + month;
    for (let i = 31; i >= 1; i--) {
      const cashbooks = this.cashbooks
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
        .map((cashbook) => cashbook.price)
        .reduce((a, b) => a + b, 0);
      const totalExpenditure: number = cashbooks
        .filter((cashbook) => cashbook.categoryType === 'expenditure')
        .map((cashbook) => cashbook.price)
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
      const $cashBookitems = li.querySelector('.cashbook-items') as HTMLUListElement;
      cashbooks.forEach((cashbook) => {
        const $cashbookItem = document.createElement('li');
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

  getTotalCash(totalIncome: number, totalExpenditure: number) {
    let result = '';
    result += totalIncome === 0 ? '' : `<label>수입 ${totalIncome.toLocaleString()}</label>`;
    result += totalExpenditure === 0 ? '' : `<label>지출 ${totalExpenditure.toLocaleString()}</label>`;
    return result;
  }
}

const $ = (query: string): HTMLElement => {
  return document.querySelector(query) as HTMLElement;
};
