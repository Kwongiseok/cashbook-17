import { emit } from '../../../utils/customEvent';
import Component from '../Component';

export default class Header extends Component {
  setup() {}

  mounted() {}

  template(): string {
    return `<div>hihihi
    <button class="test1">test1</button>
    <button class="test2">test2</button>
    </div>`;
  }

  setEvent() {
    const test1 = document.querySelector('.test1');
    const test2 = document.querySelector('.test2');
    test1?.addEventListener('click', () => {
      emit('statechange', { ...history.state, path: '/chart' });
    });
    test2?.addEventListener('click', () => {
      emit('statechange', { ...history.state, path: '/' });
    });
  }
}
