import { HistoryState } from '../types';

export default class Component<T> {
  $target: HTMLElement;
  state: T;
  constructor($target: HTMLElement, state: T) {
    this.$target = $target;
    this.state = state;
    this.setup();
    this.render();
  }
  setup(): void {} // state 초기화
  template(): string {
    // template 리터럴
    return '';
  }
  render(): void {
    this.$target.innerHTML = this.template();
    this.setEvent();
    this.mounted();
  }
  mounted(): void {} // 자식 컴포넌트 추가
  setEvent(): void {} // 이벤트 등록
  setState(newState: Object): void {
    this.state = { ...this.state, ...newState };
    this.render();
  }
}
