import Component from '../../utils/Component';
import { NUMBER_OF_DAYS_IN_WEEK } from '../../constants/days';

interface CalendarDate {
  prevMonthLastDate: Date;
  thisMonthFirstDate: Date;
  thisMonthLastDate: Date;
  nextMonthFirstDate: Date;
}

export default class Calendar extends Component {
  setup() {}

  mounted() {}

  setEvent() {}

  template(): string {
    return `
      <div class="caledar-body">
      </div>
    `;
  }

  convertCalendarDaysToHTML(day: Date): string {
    const { prevMonthLastDate, thisMonthFirstDate, thisMonthLastDate, nextMonthFirstDate } = this.extractFromDate(day);
    return '';
  }

  extractFromDate(day: Date): CalendarDate {
    const month = day.getMonth();
    const year = day.getFullYear();
    return {
      prevMonthLastDate: new Date(year, month, 0),
      thisMonthFirstDate: new Date(year, month, 1),
      thisMonthLastDate: new Date(year, month + 1, 0),
      nextMonthFirstDate: new Date(year, month + 1, 1),
    };
  }
}
