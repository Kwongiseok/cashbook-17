import Router from './router';
import Header from './views/Header/Header';
import ChartPage from './views/ChartPage/ChartPage';
import { trigger } from './utils/customEvent';
import './index.scss';
import MainPage from './views/MainPage/MainPage';

const $header: HTMLElement = document.getElementById('header') as HTMLElement;
const $wrapper: HTMLElement = document.getElementById('wrapper') as HTMLElement;
new Router($header, $wrapper);

trigger(
  'statechange',
  history.state ?? {
    path: '/',
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    isFirst: true,
  }
);
