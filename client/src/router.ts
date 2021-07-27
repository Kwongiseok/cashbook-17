import MainView from './views/MainView/MainView';
import HeaderView from './views/HeaderView/HeaderView';
import Model from '../src/models/model';
import CalendarView from './views/CalendarView/CalendarView';
import { listen } from '../src/utils/customEvent';

export default class Router {
  $wrapper: HTMLElement;
  constructor($header: HTMLElement, $wrapper: HTMLElement) {
    this.$wrapper = $wrapper;
    new HeaderView($header, history.state);
    new MainView($wrapper, history.state);
    new CalendarView($wrapper, history.state);

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
