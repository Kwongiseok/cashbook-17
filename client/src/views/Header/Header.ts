import Model from '../../models/model';
import { trigger } from '../../utils/customEvent';
import Component from '../../components/common/Component';
import './header.scss';

export default class Header extends Component {
  constructor($target: HTMLElement, state: Object) {
    super($target, state);
    Model.subscribe('statechange', (data: object) => {
      console.log(data);
      this.render();
    });
  }
  render() {
    this.$target.innerHTML = this.template();
    this.setEvent();
  }
  setup() {}

  mounted() {}

  template(): string {
    return `<div>hihihi
    <button class="test1">이전달</button>
    <button class="test2">다음달</button>
    <button class="test3">달력</button>
    </div>`;
  }

  setEvent() {
    const test1 = document.querySelector('.test1');
    const test2 = document.querySelector('.test2');
    const test3 = document.querySelector('.test3');
    test1?.addEventListener('click', () => {
      console.log('hi');
      Model.publish('statechange', { month: '이전달' });
    });
    test2?.addEventListener('click', () => {
      Model.publish('statechange', { month: '다음달' });
    });
    test3?.addEventListener('click', () => {
      trigger('statechange', { ...history.state, path: '/calendar' });
    });
  }
}
