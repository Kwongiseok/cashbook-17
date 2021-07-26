class Component {
  $target: HTMLElement;
  $state: Object;
  constructor($target: HTMLElement) {
    this.$target = $target;
    this.setup();
    this.render();
  }
  setup(): void {}
  template(): string {
    return '';
  }
  render(): void {
    this.$target.innerHTML = this.template();
    this.setEvent();
  }
  mounted(): void {}
  setEvent(): void {}
  setState(newState): void {
    this.$state = { ...this.$state, ...newState };
    this.render();
  }
}
