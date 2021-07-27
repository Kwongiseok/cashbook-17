import Model from '../../models/model';
import Component from '../../utils/Component';
import { DAY_OF_THE_WEEK } from '../../constants/days';
import Calendar from '../../components/Calendar/Calendar';
import './calendarView.scss';
import formatPrice from '../../utils/formatPrice';

export default class CalendarView extends Component {
  constructor($target: HTMLElement, state: Object) {
    super($target, state);
    Model.subscribe('statechange', (data: any) => {
      if (data.path !== '/calendar') return;
      this.setState(data);
    });
  }
  setup() {}

  mounted(): void {
    new Calendar(document.querySelector('.calendar-body') as HTMLElement, this.$state);
  }

  template(): string {
    return `<div class="calendar-container">
    <ul class="calendar-header">
      ${this.convertDayOfTheWeekToHTML()}
    </ul>
    <div class="calendar-body"></div>
    <div class="calendar-footer">
      <div class="calendar-footer-left">
        <span class="calendar-total-income">총 수입: ${formatPrice(1822480)}</span>
        <span class="calendar-total-expenditure">총 지출: ${formatPrice(834640)}</span>
      </div>
      <div class="calendar-footer-right">
        <span>총계: ${formatPrice(987840)}</span>
      </div>
    </div>
    </div>`;
  }

  setEvent() {}

  convertDayOfTheWeekToHTML(): string {
    return DAY_OF_THE_WEEK.map((day) => `<li class="calendar-header-day">${day}</li>`).join('');
  }
}
