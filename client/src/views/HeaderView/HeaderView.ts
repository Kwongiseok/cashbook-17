import { trigger } from '../../utils/customEvent';
import Component from '../../utils/Component';
import './header.scss';
import Navigator from '../../components/Navigator/Navigator';
import { HistoryState } from '../../types';
import CALENDAR_ICON_PATH from '../../../public/images/calendarIcon.svg';
import CHART_ICON_PATH from '../../../public/images/chartIcon.svg';
import DOCS_ICON_PATH from '../../../public/images/docsIcon.svg';
import Model from '../../models/model';

export default class HeaderView extends Component<HistoryState> {
  state: HistoryState;
  constructor($target: HTMLElement, state: HistoryState) {
    super($target, state);
    this.state = state;
  }

  mounted() {
    const navigator = new Navigator(document.querySelector('.header-navigator-wrapper') as HTMLElement, this.state);
  }

  template(): string {
    return `
    <div class="header-content-container">
      <button class="header-home">우아한 가계부</button>
      <div class="header-navigator-wrapper"></div>
      <div class="header-icon-container">
        <button class="header-button header-docs"><img class="header-icon docs-icon" src="${DOCS_ICON_PATH}"/></button>
        <button class="header-button header-calendar"><img class="header-icon calendar-icon" src="${CALENDAR_ICON_PATH}"/></button>
        <button class="header-button header-chart"><img class="header-icon chart-icon" src="${CHART_ICON_PATH}"/></button>
      </div>
    </div>`;
  }

  setEvent(): void {
    const $homeButton = document.querySelector('.header-home') as HTMLElement;
    const $docsButton = document.querySelector('.header-docs') as HTMLElement;
    const $calendarButton = document.querySelector('.header-calendar') as HTMLElement;
    const $chartButton = document.querySelector('.header-chart') as HTMLElement;

    $homeButton.addEventListener('click', () => {
      trigger('statechange', { ...history.state, path: '/' });
    });
    $docsButton.addEventListener('click', () => {
      trigger('statechange', { ...history.state, path: '/' });
    });
    $calendarButton.addEventListener('click', () => {
      trigger('statechange', { ...history.state, path: '/calendar' });
    });
    $chartButton.addEventListener('click', () => {
      trigger('statechange', { ...history.state, path: '/chart' });
    });
  }

  resetButtonClickedClass() {
    const elements = document.querySelectorAll('.header-button');
    elements.forEach((el) => el.classList.remove('icon-clicked'));
  }

  handleIconWhenChangeState(path: string) {
    const $docsButton = document.querySelector('.header-docs') as HTMLElement;
    const $calendarButton = document.querySelector('.header-calendar') as HTMLElement;
    const $chartButton = document.querySelector('.header-chart') as HTMLElement;
    this.resetButtonClickedClass();
    if (path === '/') {
      $docsButton.classList.add('icon-clicked');
    } else if (path === '/calendar') {
      $calendarButton.classList.add('icon-clicked');
    } else if (path === '/chart') {
      $chartButton.classList.add('icon-clicked');
    }
  }
}
