import { EXPENDITURE_CATEGORY } from '../../constants/category';
import { HistoryState } from '../../types';
import Component from '../../utils/Component';

const dummy = [
  { category: '생활', percent: 64, total: 536460 },
  { category: '의료/건강', percent: 15, total: 125300 },
  { category: '쇼핑/뷰티', percent: 7, total: 56000 },
  { category: '교통', percent: 6, total: 45340 },
  { category: '식비', percent: 5, total: 40540 },
  { category: '문화/여가', percent: 2, total: 20800 },
  { category: '미분류', percent: 1, total: 10200 },
];

export default class BarChart extends Component {
  $state: HistoryState;
  constructor($target: HTMLElement, state: HistoryState) {
    super($target, state);
    this.$state = state;
  }
}
