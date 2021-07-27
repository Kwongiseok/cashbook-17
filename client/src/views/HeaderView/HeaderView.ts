import Model from '../../models/model';
import { trigger } from '../../utils/customEvent';
import Component from '../../utils/Component';
import './header.scss';
import { CALENDAR_ICON_PATH } from '../../constants/imagePath';
import Navigator from '../../components/Navigator/Navigator';
import { HistoryState } from '../../types';

export default class HeaderView extends Component {
  $state: HistoryState;
  constructor($target: HTMLElement, state: HistoryState) {
    super($target, state);
    this.$state = state;
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
    const $homeButton = document.querySelector('.header-home');
    const $docsButton = document.querySelector('.header-docs');
    const $calendarButton = document.querySelector('.header-calendar');
    const $chartButton = document.querySelector('.header-chart');
    $homeButton?.addEventListener('click', () => {
      trigger('statechange', { ...history.state, path: '/' });
    });
    $docsButton?.addEventListener('click', () => {
      trigger('statechange', { ...history.state, path: '/' });
    });
    $calendarButton?.addEventListener('click', () => {
      trigger('statechange', { ...history.state, path: '/calendar' });
    });
    $chartButton?.addEventListener('click', () => {
      trigger('statechange', { ...history.state, path: '/chart' });
    });
  }
}
