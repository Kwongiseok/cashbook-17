import MainPage from './views/MainPage/MainPage';
import Header from './views/Header/Header';
import Model from '../src/models/model';
import CalendarPage from './views/CalendarPage/CalendarPage';
import { listen } from '../src/utils/customEvent';

export default class Router {
  $wrapper: HTMLElement;
  constructor($header: HTMLElement, $wrapper: HTMLElement) {
    this.$wrapper = $wrapper;
    new Header($header, history.state);
    new MainPage($wrapper, history.state);
    new CalendarPage($wrapper, history.state);

    listen('statechange', this.stateChangeHandler.bind(this) as EventListener);
    window.addEventListener('popstate', this.popstateHandler.bind(this));
  }

  stateChangeHandler(event: CustomEvent) {
    history.pushState(event.detail, '', event.detail.path);
    Model.publish('statechange', history.state);
  }

  popstateHandler() {
    if (history.state === null) return;
    Model.publish('statechange', history.state);
  }
}
