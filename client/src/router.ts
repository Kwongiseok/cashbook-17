import Component from './components/common/Component';

interface ClassContructor {
  new (root: HTMLElement, state: object): Component;
}
interface RouterType {
  [key: string]: ClassContructor;
}

export default class Router {
  $root: HTMLElement;
  routes: RouterType = {};
  constructor($root: HTMLElement, routes: RouterType) {
    this.$root = $root;
    this.routes = routes;

    document.addEventListener('statechange', this.stateChangeHandler.bind(this) as EventListener);
    window.addEventListener('popstate', this.popstateHandler.bind(this));
  }

  stateChangeHandler(event: CustomEvent) {
    history.pushState(event.detail, '', event.detail.path);
    const path: string = event.detail.path;
    this.registerComponent(path, event.detail);
  }

  popstateHandler() {
    this.registerComponent(history.state.path, history.state);
  }

  registerComponent(path: string, state: object) {
    const componentClass: ClassContructor = this.routes[path];
    new componentClass(this.$root, state);
  }
}
