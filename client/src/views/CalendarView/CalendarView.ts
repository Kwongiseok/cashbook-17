import Model from '../../models/model';
import Component from '../../utils/Component';
import { DAY_OF_THE_WEEK } from '../../constants/days';

export default class CalendarView extends Component {
  constructor($target: HTMLElement, state: Object) {
    super($target, state);
    Model.subscribe('statechange', (data: any) => {
      if (data.path !== '/calendar') return;
      this.setState(data);
    });
  }
  setup() {}

  mounted() {}

  template(): string {
    return `<div class="calendar-container">
    <ul class="calendar-header">
      ${this.convertDayOfTheWeekToHTML()}
    </ul>
    </div>`;
  }

  setEvent() {}

  convertDayOfTheWeekToHTML(): string {
    return DAY_OF_THE_WEEK.map((day) => `<li class="calendar-header-day">${day}</li>`).join('');
  }
}
