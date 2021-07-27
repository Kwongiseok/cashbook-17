import Component from '../../utils/Component';
import { NUMBER_OF_DAYS_IN_WEEK } from '../../constants/days';
import './calendar.scss';
import { HistoryState } from '../../types';
interface CalendarDate {
  prevMonthLastDate: Date;
  thisMonthFirstDate: Date;
  thisMonthLastDate: Date;
  nextMonthFirstDate: Date;
}

export default class Calendar extends Component {
  $state: HistoryState;
  constructor($target: HTMLElement, state: HistoryState) {
    super($target, state);
    this.$state = state;
  }
  template(): string {
    const { year, month } = this.$state;
    if (year && month)
      return `
      ${this.convertCalendarDaysToHTML(year, month - 1)}
    `;
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
          ${prevMonthLastDate.getDate() - thisMonthFirstDate.getDay() + d + 1}
        </div>`
      );
    }
  }

  pushNowDate(thisMonthFirstDate: Date, thisMonthLastDate: Date, array: Array<string>) {
    for (let d = 0; d < thisMonthLastDate.getDate(); d++) {
      array.push(
        `<div
          class="
            ${(thisMonthFirstDate.getDay() + d) % 7 === 0 ? 'calendar-sun' : ''}
            ${(thisMonthFirstDate.getDay() + d) % 7 === 6 ? 'calendar-sat' : ''}
            calendar-day prev-month
          "
        >
          ${d + 1}
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
            calendar-day prev-month
          "
        >
          ${d + 1}
        </div>`
      );
    }
  }

  mounted() {}

  setEvent() {}
}
