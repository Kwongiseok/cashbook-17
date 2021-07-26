import Router from './router';
import Header from './components/common/Header/Header';
import { emit } from './utils/customEvent';
const routes = {
  '/': Header,
};

const $root: HTMLElement = document.getElementById('root') as HTMLElement;
new Router($root, routes);

emit(
  'statechange',
  history.state ?? {
    path: '/',
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    isFirst: true,
  }
);
