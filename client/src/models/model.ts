import { HistoryState } from '../types';
import { getMainChartData, getMonthData } from '../apis/cashbookAPI';

type Subscription = {
  [key: string]: Array<Function>;
};

const Model = {
  subscriptions: {} as Subscription,
  /**
   * @method publish
   *
   * @param event { string } - name of the event to publish
   * @param data  { any }    - optional data to pass on to subscription
   *
   * @example
   * - event.publish('event');
   * - event.publish('event', { data: 'customData' });
   * - event.publish('event event1 event2', { data: 'customData' });
   */

  publish(event: string, data?: object | Array<Object>): void {
    const events = this.subscriptions[event];
    events.forEach((cb) => cb(data));
  },
  /**
   * @method subscribe
   *
   * @param event    { string } 	- name of the event to subscribe to
   * @param callback { function } - function callback to execute once the event has been published
   *
   * @example
   * - event.subscribe('event', function () { ... });
   * - event.subscribe('event event1 event2', function (data) { ... });
   * - event.subscribe('event.namespaced', function (data) { ... });
   */
  subscribe(event: string, callback: Function): void {
    if (this.subscriptions[event]) {
      this.subscriptions[event].push(callback);
    } else {
      this.subscriptions[event] = [callback];
    }
  },
};

Model.subscribe('statechange', fetchCashbookData);

async function fetchCashbookData(historyState: HistoryState) {
  const [year, month] = [historyState.year as Number, historyState.month as Number];
  if (historyState.path === '/chart') {
    const { total, datas } = await getMainChartData(year, month);
    Model.publish('updateHistory', { ...historyState, total, data: datas });
  } else {
    const data = await getMonthData(year, month);
    Model.publish('updateHistory', { ...historyState, data });
  }
}

export default Model;
