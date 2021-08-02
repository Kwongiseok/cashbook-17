import { trigger } from '../../utils/customEvent';
import Component from '../../utils/Component';
import './header.scss';
import Navigator from '../../components/Navigator/Navigator';
import { HeaderState } from '../../types';
import CALENDAR_ICON_PATH from '../../../public/images/calendarIcon.svg';
import CHART_ICON_PATH from '../../../public/images/chartIcon.svg';
import DOCS_ICON_PATH from '../../../public/images/docsIcon.svg';
import GITHUB_ICON_PATH from '../../../public/images/githubIcon.svg';
import DOOR_ICON_PATH from '../../../public/images/doorIcon.svg';
import Model from '../../models/model';

export default class HeaderView extends Component<HeaderState> {
  constructor($target: HTMLElement, state: HeaderState) {
    super($target, state);
    Model.subscribe('statechange', () => {
      this.handleIconWhenChangeState(history.state.path);
      this.handleAuthIcon(this.state.isLoggedIn as boolean);
    });
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
        <div class="header-button-container"> 
          <button class="header-button header-docs"><img class="header-icon docs-icon" src="${DOCS_ICON_PATH}"/></button>
          <button class="header-button header-calendar"><img class="header-icon calendar-icon" src="${CALENDAR_ICON_PATH}"/></button>
          <button class="header-button header-chart"><img class="header-icon chart-icon" src="${CHART_ICON_PATH}"/></button>
        </div>
        <button class="header-button header-login"><img class="header-icon login-icon" src="${GITHUB_ICON_PATH}"></button>
        <button class="header-button header-logout"><img class="header-icon login-icon" src="${DOOR_ICON_PATH}"></button>
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

  handleAuthIcon(isLoggedIn: boolean): void {
    const $login = document.querySelector('.header-login') as HTMLElement;
    const $logout = document.querySelector('.header-logout') as HTMLElement;
    $login.style.display = 'none';
    $logout.style.display = 'none';
    if (isLoggedIn) {
      $logout.style.display = 'block';
    } else {
      $login.style.display = 'block';
    }
  }
}
