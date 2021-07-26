import Component from '../common/Component';
import Calendar from './Calendar/Calendar';

export default class CalendarPage extends Component {
  mounted() {
    const $wrapper = document.querySelector('.calendar-wrapper');

    new Calendar($wrapper as HTMLElement, { year: 4, month: 5 });
  }

  template(): string {
    return '<div class="calendar-wrapper"></div>';
  }

  setEvent() {}
}
