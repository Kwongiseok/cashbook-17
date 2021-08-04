import { CATEGORY } from './../../types';
import Model from '../../models/model';
import Component from '../../utils/Component';
import { DAY_OF_THE_WEEK } from '../../constants/days';
import Calendar from '../../components/Calendar/Calendar';
import './calendarView.scss';
import formatPrice from '../../utils/formatPrice';
import { CATEGORY_COLOR, INCOME } from '../../constants/category';
import { CalendarDataType, CalendarDayType, CalendarState, CashbookType } from '../../types';

export default class CalendarView extends Component<CalendarState> {
  constructor($target: HTMLElement, state: CalendarState) {
    super($target, state);
    Model.subscribe('updateHistory', (data: any) => {
      if (data.path !== '/calendar') return;
      const newState = this.processData(data);
      this.setState(newState);
    });
  }

  setEvent() {
    const $modal = document.querySelector('.calendar-day-modal') as HTMLElement;
    $modal.addEventListener('click', () => {
      const $container = document.querySelector('.calendar-modal-container') as HTMLElement;
      $container.classList.add('modal-close-animation');
      $modal.classList.add('closeModal');
      setTimeout(() => {
        $modal.classList.remove('opened');
        $container.classList.remove('modal-close-animation');
        $modal.classList.remove('closeModal');
      }, 300);
    });
  }

  mounted(): void {
    const $calendarBody = document.querySelector('.calendar-body');
    new Calendar($calendarBody as HTMLElement, { ...this.state, openModal: this.openCalendarDataModal.bind(this) });
  }

  template(): string {
    const { total, expenditureTotal, incomeTotal } = this.state;
    return `<div class="calendar-container">
    <ul class="calendar-header">
      ${this.convertDayOfTheWeekToHTML()}
    </ul>
    <div class="calendar-body"></div>
    <div class="calendar-footer">
      <div class="calendar-footer-left">
        <span class="calendar-total-income">총 수입: ${this.formatTotal(incomeTotal)}</span>
        <span class="calendar-total-expenditure">총 지출: ${this.formatTotal(expenditureTotal)}</span>
      </div>
      <div class="calendar-footer-right">
        <span>총계: ${this.formatTotal(total)}</span>
      </div>
    </div>
    </div>
    <div class="calendar-day-modal"></div>
    `;
  }

  convertDayOfTheWeekToHTML(): string {
    return DAY_OF_THE_WEEK.map((day) => `<li class="calendar-header-day">${day}</li>`).join('');
  }

  formatTotal(total: number) {
    if (total < 0) {
      return '-' + formatPrice(total);
    }
    return '+' + formatPrice(total);
  }

  processData(updateData: any): CalendarState {
    const calendarData: CalendarDataType = {};
    let [total, incomeTotal, expenditureTotal] = [0, 0, 0];
    updateData.data.forEach((item: CashbookType) => {
      const price = item.price as number;
      const key = new Date(item.date as string).getDate();
      if (!calendarData[key]) {
        calendarData[key] = this.initialCalendarData();
      }
      if (item.category_type === INCOME) {
        calendarData[key].income += price;
        incomeTotal += price;
      } else {
        calendarData[key].expenditure += price;
        expenditureTotal += price;
      }
      calendarData[key].total += price;
      total += price;
      calendarData[key].datas.push(item);
    });
    return { ...updateData, calendarData, total, expenditureTotal, incomeTotal };
  }

  initialCalendarData(): CalendarDayType {
    return {
      income: 0,
      expenditure: 0,
      total: 0,
      datas: [],
    };
  }

  openCalendarDataModal(data: CashbookType[]): void {
    const $modal = document.querySelector('.calendar-day-modal') as HTMLElement;
    $modal.innerHTML = this.pushModalData(data);
    $modal.classList.add('opened');
  }

  pushModalData(data: CashbookType[]): string {
    const income: CashbookType[] = [];
    const expenditure: CashbookType[] = [];
    data.forEach((item) => (item.category_type === INCOME ? income.push(item) : expenditure.push(item)));
    return `
      <div class="calendar-modal-container">
        <div class="calendar-modal-incomes">
          <p class="calendar-modal-title">INCOME</p>
          ${this.convertFromData(income)}
        </div>
        <div class="calendar-modal-expenditures">
          <p class="calendar-modal-title">EXPENDITURE</p>
          ${this.convertFromData(expenditure)}
        </div>
      </div>`;
  }

  convertFromData(data: CashbookType[]): string {
    return data
      .map(
        (item) => `
      <div class="calendar-modal-data">
        <div class="calendar-modal-top">
          <div class="calendar-modal-category" style="color:${CATEGORY_COLOR[item.category as CATEGORY]}">${
          item.category
        }</div>
          <span class="calendar-modal-payment">${item.payment}</span>
        </div>
        <div class="calendar-modal-bottom">
          <div class="calendar-modal-memo">${item.memo}</div>
          <span class="calendar-modal-price">${formatPrice(item.price as number)}</span>
        </div>
    </div>`
      )
      .join('');
  }
}
