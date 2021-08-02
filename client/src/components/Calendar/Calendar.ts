import Component from '../../utils/Component';
import './calendar.scss';
import { CalendarDataType, CalendarDate, CalendarState } from '../../types';
import formatPrice from '../../utils/formatPrice';

export default class Calendar extends Component<CalendarState> {
  constructor($target: HTMLElement, state: CalendarState) {
    super($target, state);
  }
  template(): string {
    if (this.state) {
      const { year, month } = this.state as CalendarState;
      return `
      ${this.convertCalendarDaysToHTML(year as number, (month as number) - 1)}
    `;
    }
    return '';
  }

  convertCalendarDaysToHTML(year: number, month: number): string {
    const calendarHTMLs: Array<string> = [];
    const { prevMonthLastDate, thisMonthFirstDate, thisMonthLastDate, nextMonthFirstDate } = this.extractFromDate(
      year,
      month
    );
    this.pushPrevDate(prevMonthLastDate, thisMonthFirstDate, calendarHTMLs);
    this.pushNowDate(thisMonthFirstDate, thisMonthLastDate, calendarHTMLs);
    this.pushNextDate(nextMonthFirstDate, calendarHTMLs);
    return calendarHTMLs.join('');
  }

  extractFromDate(year: number, month: number): CalendarDate {
    return {
      prevMonthLastDate: new Date(year, month, 0),
      thisMonthFirstDate: new Date(year, month, 1),
      thisMonthLastDate: new Date(year, month + 1, 0),
      nextMonthFirstDate: new Date(year, month + 1, 1),
    };
  }

  pushPrevDate(prevMonthLastDate: Date, thisMonthFirstDate: Date, array: Array<string>) {
    for (let d = 0; d < thisMonthFirstDate.getDay(); d++) {
      array.push(
        `<div
          class="${d % 7 === 0 ? 'calendar-sun' : ''} calendar-day prev-month"
        >
          <span>${prevMonthLastDate.getDate() - thisMonthFirstDate.getDay() + d + 1}</span>
        </div>`
      );
    }
  }

  pushNowDate(thisMonthFirstDate: Date, thisMonthLastDate: Date, array: Array<string>) {
    const today = new Date();
    const isToday = today.getFullYear() === this.state.year && today.getMonth() === (this.state.month as number) - 1;
    for (let d = 0; d < thisMonthLastDate.getDate(); d++) {
      array.push(
        `<div
          class="
            ${isToday && today.getDate() === d + 1 ? 'calendar-today' : ''}
            ${(thisMonthFirstDate.getDay() + d) % 7 === 0 ? 'calendar-sun' : ''}
            ${(thisMonthFirstDate.getDay() + d) % 7 === 6 ? 'calendar-sat' : ''}
            calendar-day now-month
          "
        >
        ${this.pushHistory(d + 1)}
        <span>${d + 1}</span>
        </div>`
      );
    }
  }

  pushNextDate(nextMonthFirstDate: Date, array: Array<string>) {
    let renderCount = 7 - (array.length % 7);
    if (array.length + renderCount === 35) {
      renderCount += 7;
    }
    for (let d = 0; d < renderCount; d++) {
      array.push(
        `<div
          class="
            ${(nextMonthFirstDate.getDay() + d) % 7 === 0 ? 'calendar-sun' : ''}
            ${(nextMonthFirstDate.getDay() + d) % 7 === 6 ? 'calendar-sat' : ''}
            calendar-day next-month
          "
        >
          <span>${d + 1}</span>
        </div>`
      );
    }
  }

  pushHistory(date: number): string {
    if (!this.state.data[date]) return '';
    const { income, expenditure, total } = this.state.data[date];
    return `
    <p class="calendar-income">+${formatPrice(income)}</p>
    <p class="calendar-expenditure">-${formatPrice(expenditure)}</p>
    <p class="calendar-total">${total >= 0 ? formatPrice(total) : '-' + formatPrice(total)}</p>
    `;
  }

  mounted() {}

  setEvent() {}
}
