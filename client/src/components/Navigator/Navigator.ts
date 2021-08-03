import Component from '../../utils/Component';
import Model from '../../models/model';
import { HistoryState } from '../../types';
import { trigger } from '../../utils/customEvent';
import './navigator.scss';

export default class Navigator extends Component {
  $state: HistoryState;
  constructor($target: HTMLElement, state: HistoryState) {
    super($target, state);
    this.$state = state;
    Model.subscribe('statechange', (data: HistoryState) => {
      const { month, year } = data;
      this.setState({ month, year });
    });
  }
  setState(nextState: HistoryState): void {
    this.$state = { ...this.$state, ...nextState };
    this.render();
  }
  template(): string {
    return `
      <button class="header-navigator-left">${'<'}</button>
      <div class="header-navigator-date">
        <h2 class="header-navigator-month">${this.$state?.month}월</h2>
        <span class="header-navigator-year">${this.$state?.year}</span>
      </div>
      <button class="header-navigator-right">${'>'}</button>
    `;
  }

  setEvent(): void {
    document.querySelector('.header-navigator-left')?.addEventListener('click', this.onClickLeftButton.bind(this));
    document.querySelector('.header-navigator-right')?.addEventListener('click', this.onClickRightButton.bind(this));
  }

  onClickLeftButton(): void {
    this.$state.month === 1
      ? trigger('statechange', { ...history.state, month: 12, year: (this.$state.year as number) - 1 })
      : trigger('statechange', { ...history.state, month: (this.$state.month as number) - 1 });
  }

  onClickRightButton(): void {
    this.$state.month === 12
      ? trigger('statechange', { ...history.state, month: 1, year: (this.$state.year as number) + 1 })
      : trigger('statechange', { ...history.state, month: (this.$state.month as number) + 1 });
  }
}
