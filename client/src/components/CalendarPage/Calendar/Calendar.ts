import Component from '../../common/Component';
import dayOfTheWeek from '../../../constants/dayOfTheWeek';

export default class Calendar extends Component {
  setup() {}

  mounted() {}

  setEvent() {}

  template(): string {
    return `<ul class="calendar-header">
      ${this.convertDayOfTheWeekToHTML()}
    </ul>`;
  }

  convertDayOfTheWeekToHTML(): string {
    return dayOfTheWeek.map((day) => `<li class="calendar-header-day">${day}</li>`).join('');
  }
}
