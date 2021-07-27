import Model from '../../models/model';
import Component from '../../components/common/Component';

export default class CalendarPage extends Component {
  constructor($target: HTMLElement, state: Object) {
    super($target, state);
    Model.subscribe('statechange', (data: any) => {
      if (data.path !== '/calendar') return;
      console.log(data);
      this.setState(data);
    });
  }
  setup() {}

  mounted() {}

  template(): string {
    return `<div>hi calendar</div>`;
  }

  setEvent() {}
}
