import { DAY_OF_THE_WEEK } from '../../constants/days';
import { CalendarDate, HistoryState } from '../../types';
import Component from '../../utils/Component';
import './datePicker.scss';

export default class DatePicker extends Component {
  $state: HistoryState;
  constructor($target: HTMLElement, state: HistoryState) {
    super($target, state);
    this.$state = state;
  }

  mounted(): void {
    const $days = document.querySelector('.datePicker-days') as HTMLElement;
    const $body = document.querySelector('.datePicker-body') as HTMLElement;
    const { year, month } = this.$state;
    $days.innerHTML = this.convertDayOfTheWeekToHTML();
    $body.innerHTML = this.convertCalendarDaysToHTML(year as number, (month as number) - 1);
  }

  setEvent(): void {
    const $leftButton = document.querySelector('.datePicker-left') as HTMLElement;
    const $rightButton = document.querySelector('.datePicker-right') as HTMLElement;
    const $body = document.querySelector('.datePicker-body') as HTMLElement;
    $leftButton.addEventListener('click', this.onClickLeft.bind(this));
    $rightButton.addEventListener('click', this.onClickRight.bind(this));
    $body.addEventListener('click', (e : Event) => {
      if(e.target.closest('.now'))
    })
  }

  template(): string {
    if (this.$state) {
      return `
      <div class="datePicker">
        <div class="datePicker-header">
          <button class="datePicker-button datePicker-left">${'<'}</button>
          <span>${this.$state.month}월 ${this.$state.year}</span>
          <button class="datePicker-button datePicker-right">${'>'}</button>
        </div>
        <ul class="datePicker-days"></ul>
        <div class="datePicker-body">
        </div>
      </div>`;
    }
    return '';
  }
  convertDayOfTheWeekToHTML(): string {
    return DAY_OF_THE_WEEK.map((day) => `<li class="datePicker-day">${day}</li>`).join('');
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
          class="${d % 7 === 0 ? 'datePicker-sun' : ''} datePicker-day prev-month"
        >
        </div>`
      );
    }
  }

  pushNowDate(thisMonthFirstDate: Date, thisMonthLastDate: Date, array: Array<string>) {
    const today = new Date();
    const isToday = today.getFullYear() === this.$state.year && today.getMonth() === (this.$state.month as number) - 1;
    for (let d = 0; d < thisMonthLastDate.getDate(); d++) {
      array.push(
        `<div
          class="
            ${isToday && today.getDate() === d + 1 ? 'datePicker-today' : ''}
            ${(thisMonthFirstDate.getDay() + d) % 7 === 0 ? 'datePicker-sun' : ''}
            ${(thisMonthFirstDate.getDay() + d) % 7 === 6 ? 'datePicker-sat' : ''}
            datePicker-day now-month
          "
          data-date=${d + 1}
        >
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
            ${(nextMonthFirstDate.getDay() + d) % 7 === 0 ? 'datePicker-sun' : ''}
            ${(nextMonthFirstDate.getDay() + d) % 7 === 6 ? 'datePicker-sat' : ''}
            datePicker-day next-month
          "
        >
        </div>`
      );
    }
  }

  onClickLeft() {
    if (this.$state.month === 1) {
      this.setState({ ...this.$state, month: 12, year: (this.$state.year as number) - 1 });
      return;
    }
    this.setState({ ...this.$state, month: (this.$state.month as number) - 1 });
  }
  onClickRight() {
    if (this.$state.month === 12) {
      this.setState({ ...this.$state, month: 1, year: (this.$state.year as number) + 1 });
      return;
    }
    this.setState({ ...this.$state, month: (this.$state.month as number) + 1 });
  }
}
