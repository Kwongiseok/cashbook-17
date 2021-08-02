import MainView from './views/MainView/MainView';
import HeaderView from './views/HeaderView/HeaderView';
import Model from '../src/models/model';
import { listen } from '../src/utils/customEvent';
import CalendarView from './views/CalendarView/CalendarView';
import ChartView from './views/ChartView/ChartView';

export default class Router {
  $wrapper: HTMLElement;
  constructor($header: HTMLElement, $wrapper: HTMLElement) {
    this.$wrapper = $wrapper;
    new HeaderView($header, { isLoggedIn: false });
    new MainView($wrapper, {});
    new CalendarView($wrapper, { total: 0, incomeTotal: 0, expenditureTotal: 0, data: {} });
    new ChartView($wrapper, { data: [], total: 0 });

    listen('statechange', this.stateChangeHandler.bind(this) as unknown as EventListener);
    window.addEventListener('popstate', this.popstateHandler.bind(this));
  }

  async stateChangeHandler(event: CustomEvent) {
    history.pushState(event.detail, '', event.detail.path);
    Model.publish('statechange', { ...history.state });
  }

  async popstateHandler() {
    if (history.state === null) return;
    Model.publish('statechange', { ...history.state });
  }
}
