import { ROLLING_NUMBER } from '../../constants/rollingNumber';
import { EXPENDITURE_CATEGORY } from '../../constants/category';
import { ExpenditureData, ExpenditureDataList, HistoryState } from '../../types';
import Component from '../../utils/Component';
import './barChart.scss';
import formatPrice from '../../utils/formatPrice';
import { triggerByElement } from '../../utils/customEvent';

const dummy = [
  { category: '생활', percent: 64, total: 536460 },
  { category: '의료/건강', percent: 15, total: 125300 },
  { category: '쇼핑/뷰티', percent: 7, total: 56000 },
  { category: '교통', percent: 6, total: 45340 },
  { category: '식비', percent: 5, total: 40540 },
  { category: '문화/여가', percent: 2, total: 20800 },
  { category: '미분류', percent: 1, total: 10200 },
];

export default class BarChart extends Component<HistoryState> {
  constructor($target: HTMLElement, state: HistoryState) {
    super($target, state);
  }

  setEvent(): void {
    const $container = document.querySelector('.bar-container') as HTMLElement;
    $container.addEventListener('click', (e: Event) => {
      const target = e.target as HTMLElement;
      const el = target.closest('.bar-expenditure-container') as HTMLElement;
      if (el && el.dataset.category) {
        triggerByElement(this.$target, 'categoryBar-click', {
          category: el.dataset.category,
        });
      }
    });
  }

  mounted(): void {
    const $container = document.querySelector('.bar-container') as HTMLElement;
    $container.innerHTML = this.makeBarGraph(dummy);
    const $barAll = [...Array.from(document.querySelectorAll('.bar-percent'))] as Array<HTMLElement>;
    $barAll.forEach(($bar, i) => {
      setTimeout(() => {
        $bar.style.width = `${$bar.dataset.percent}%`;
      }, i * 50);
    });
  }
  template(): string {
    return `
    <div class="bar-total-expenditure"> 
      <span class="bar-total-expenditure-title">이번 달 지출 금액 :</span>
      ${this.makeRollingNumber('834,640')}
    </div>
    <div class="bar-container"></div>`;
  }

  makeBarGraph(data: ExpenditureDataList): string {
    return data.map((item) => this.convertToBarHTML(item)).join('');
  }

  convertToBarHTML(data: ExpenditureData): string {
    return `
    <div class="bar-expenditure-container" data-category=${data.category}>
      <div class="bar-expenditure-left">
        <div class="bar-category" style="background-color:${EXPENDITURE_CATEGORY[data.category]}">${data.category}</div>
        <div class="bar-percent-text-container">
          ${this.makeRollingNumber(`${data.percent}`)}
          <span class="bar-percent-ex">%</span>
        </div>
        <div class="bar-percent-container">
          <div class="bar-percent" 
              style="background-color:${EXPENDITURE_CATEGORY[data.category]}" 
              data-percent=${data.percent}>
          </div>
        </div>
      </div>
      <div class="bar-expenditure-right">${this.makeRollingNumber(formatPrice(data.total))}</div>
    </div>`;
  }

  makeRollingNumber(total: string): string {
    const convertedHTML = Array.from(total)
      .map((txt) => {
        if (this.isNumeric(txt)) {
          return `<div class="rolling-container">
            <span class="rolling-real-text">${txt}</span>
            <div class="rolling-text" style="top : ${-2000 - parseInt(txt) * 100}%;animation-duration: ${
            1000 + Math.random() * 10 * 60
          }ms;">${ROLLING_NUMBER}</div>
          </div>`;
        }
        return `<div class="not-rolling-text">${txt}</div>`;
      })
      .join('');
    return convertedHTML;
  }
  isNumeric(data: string): boolean {
    return !isNaN(Number(data));
  }
}
