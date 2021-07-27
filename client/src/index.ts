import Router from './router';
import { trigger } from './utils/customEvent';
import './styles/index.css';

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
