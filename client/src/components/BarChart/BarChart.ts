import { ROLLING_NUMBER } from '../../constants/rollingNumber';
import { EXPENDITURE_CATEGORY } from '../../constants/category';
import { ExpenditureData, ExpenditureDataList, MainChartData } from '../../types';
import Component from '../../utils/Component';
import formatPrice from '../../utils/formatPrice';
import './barChart.scss';

export default class BarChart extends Component<MainChartData> {
  constructor($target: HTMLElement, state: MainChartData) {
    super($target, state);
  }

  setEvent(): void {
    const $container = document.querySelector('.bar-container') as HTMLElement;
    $container.addEventListener('click', (e: Event) => {
      const target = e.target as HTMLElement;
      const el = target.closest('.bar-expenditure-container') as HTMLElement;
      if (el && el.dataset.category) {
        // TODO: 추후에 date 받아서 입력할 년월일 계산하여 6개월 데이터 받아와야 함.
        console.log(this.state.year, this.state.month, el.dataset.category);
      }
    });
  }

  mounted(): void {
    if (this.state.data) {
      const $total = document.querySelector('.bar-total-expenditure') as HTMLElement;
      const $container = document.querySelector('.bar-container') as HTMLElement;

      $total.innerHTML += this.makeRollingNumber(formatPrice(this.state.total));
      $container.innerHTML = this.makeBarGraph(this.state.data);

      const $barAll = [...Array.from(document.querySelectorAll('.bar-percent'))] as Array<HTMLElement>;
      $barAll.forEach(($bar, i) => {
        setTimeout(() => {
          $bar.style.width = `${$bar.dataset.percent}%`;
        }, i * 50);
      });
    }
  }

  template(): string {
    return `
    <div class="bar-total-expenditure"> 
      <span class="bar-total-expenditure-title">이번 달 지출 금액 :</span>
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
