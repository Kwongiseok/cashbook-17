import Model from '../../models/model';
import Component from '../../utils/Component';
import { DAY_OF_THE_WEEK } from '../../constants/days';
import Calendar from '../../components/Calendar/Calendar';
import './calendarView.scss';
import formatPrice from '../../utils/formatPrice';
import { INCOME } from '../../constants/category';
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
  setup() {}

  mounted(): void {
    const $calendarBody = document.querySelector('.calendar-body');
    const $footer = document.querySelector('.calendar-footer');
    new Calendar($calendarBody as HTMLElement, this.state);
    // $calendarBody?.classList.add('fade-enter-active');
    // $footer?.classList.add('fade-enter-active');
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
    </div>`;
  }

  setEvent() {}

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
    const data: CalendarDataType = {};
    let [total, incomeTotal, expenditureTotal] = [0, 0, 0];
    updateData.data.forEach((item: CashbookType) => {
      const price = item.price as number;
      const key = new Date(item.date as string).getDate();
      if (!data[key]) {
        data[key] = this.initialCalendarData();
      }
      if (item.category_type === INCOME) {
        data[key].income += price;
        incomeTotal += price;
      } else {
        data[key].expenditure += price;
        expenditureTotal += price;
      }
      data[key].total += price;
      total += price;
    });
    return { ...updateData, data, total, expenditureTotal, incomeTotal };
  }

  initialCalendarData(): CalendarDayType {
    return {
      income: 0,
      expenditure: 0,
      total: 0,
    };
  }
}
