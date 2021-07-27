import Component from '../common/Component';
import Calendar from './Calendar/Calendar';

class Navigator extends Component {
  setup() {}

    new Calendar($wrapper as HTMLElement, { year: 4, month: 5 });
  }

  template(): string {
    return '<div class="calendar-wrapper"></div>';
  }

  setEvent() {}
}
