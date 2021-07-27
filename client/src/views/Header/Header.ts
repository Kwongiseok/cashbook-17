import Model from '../../models/model';
import { trigger } from '../../utils/customEvent';
import Component from '../../components/common/Component';
import './header.scss';
import { CALENDAR_ICON_PATH } from '../../constants/imagePath';
import Navigator from '../../components/Navigator/Navigator';
import { HistoryState } from 'types';

export default class Header extends Component {
  $state: HistoryState;
  constructor($target: HTMLElement, state: HistoryState) {
    super($target, state);
    this.$state = state;
    Model.subscribe('statechange', (data: HistoryState) => {
      this.render();
    });
  }

  mounted() {
    const navigator = new Navigator(document.querySelector('.header-navigator-wrapper') as HTMLElement, this.$state);
  }

  template(): string {
    return `<div class="header-content-container">
      <button class="header-home">우아한 가계부</button>
      <div class="header-navigator-wrapper"></div>
      <button class="header-button header-docs"><img class="header-Icon" src="${CALENDAR_ICON_PATH}"/></button>
      <button class="header-button header-calendar"><img class="header-Icon" src="${CALENDAR_ICON_PATH}"/></button>
      <button class="header-button header-chart"><img class="header-Icon" src="${CALENDAR_ICON_PATH}"/></button>
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
