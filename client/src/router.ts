import MainView from './views/MainView/MainView';
import HeaderView from './views/HeaderView/HeaderView';
import Model from '../src/models/model';
import CalendarView from './views/CalendarView/CalendarView';
import { listen } from '../src/utils/customEvent';
import ChartView from './views/ChartView/ChartView';

export default class Router {
  $wrapper: HTMLElement;
  constructor($header: HTMLElement, $wrapper: HTMLElement) {
    this.$wrapper = $wrapper;
    new HeaderView($header, {});
    new MainView($wrapper, {});
    new CalendarView($wrapper, {});
    new ChartView($wrapper, {});

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
