import Router from './router';
import Header from './components/common/Header/Header';
import ChartPage from './components/ChartPage/ChartPage';
import { emit } from './utils/customEvent';
import CalendarPage from './components/CalendarPage/CalendarPage';
// import './index.scss';

const routes = {
  '/': Header,
  '/chart': ChartPage,
  '/calendar': CalendarPage,
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
