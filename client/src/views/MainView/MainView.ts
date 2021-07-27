import Component from '../../utils/Component';
import Model from '../../models/model';

export default class MainView extends Component {
  constructor($target: HTMLElement, state: Object) {
    super($target, state);
    Model.subscribe('statechange', (data: Object) => {
      this.setState(data);
    });
  }
  setup() {}

  mounted() {}

  template(): string {
    return `<div>hi</div>`;
  }

  setEvent() {}
}
