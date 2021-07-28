import { EXPENDITURE_CATEGORY } from '../../constants/category';
import { ExpenditureData, ExpenditureDataList, HistoryState } from '../../types';
import Component from '../../utils/Component';
import './barChart.scss';

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
  mounted(): void {
    const $container = document.querySelector('.bar-container') as HTMLElement;
    $container.innerHTML = this.makeBarGraph(dummy);
    const $barAll = document.querySelectorAll('.bar-percent');
    $barAll.forEach(($bar, i) => {
      setTimeout(() => {
        $bar.style.width = `${$bar.dataset.percent}%`;
      }, i * 50);
    });
  }
  template(): string {
    return `
    <div class="bar-total-expenditure">이번 달 지출 금액 : ${'834,640'}</div>
    <div class="bar-container"></div>`;
  }

  makeBarGraph(data: ExpenditureDataList): string {
    const array: Array<String> = [];
    data.forEach((item) => {
      array.push(this.convertToBarHTML(item));
    });
    return array.join('');
  }

  convertToBarHTML(data: ExpenditureData): string {
    return `
    <div class="bar-expenditure-container">
      <div class="bar-expenditure-left">
        <div class="bar-category" style="background-color:${EXPENDITURE_CATEGORY[data.category]}">${data.category}</div>
        <div class="bar-percent-text-container">${data.percent}%</div>
        <div class="bar-percent-container">
          <div class="bar-percent" 
              style="background-color:${EXPENDITURE_CATEGORY[data.category]}" 
              data-percent=${data.percent}>
          </div>
        </div>
      </div>
      <div class="bar-expenditure-right">${data.total}</div>
    </div>`;
  }
}
