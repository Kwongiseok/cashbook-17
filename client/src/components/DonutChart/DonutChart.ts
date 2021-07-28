import { EXPENDITURE_CATEGORY } from '../../constants/category';
import { ExpenditureDataList, HistoryState } from '../../types';
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

export default class DonutChart extends Component {
  $state: HistoryState;
  constructor($target: HTMLElement, state: HistoryState) {
    super($target, state);
    this.$state = state;
  }
  mounted(): void {
    const $container = document.querySelector('.donut-container');
    const $svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    $svg.setAttribute('width', '100%');
    $svg.setAttribute('height', '100%');
    $svg.setAttribute('viewBox', '0 0 100 100');
    this.appendCircle($svg, dummy);
    $container?.appendChild($svg);
  }
  template(): string {
    return '<div class="donut-container"></div>';
  }

  appendCircle($svg: SVGSVGElement, data: ExpenditureDataList): void {
    const [startAngle, radius, cx, cy, strokeWidth, animationDuration] = [-90, 20, '40', '40', '10', 400];
    const dashArray = 2 * Math.PI * radius;
    let filled = 0;
    data.forEach((item) => {
      const dashOffset = dashArray - (dashArray * item.percent) / 100;
      const angle = (filled * 360) / 100 + startAngle;
      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      const currentDuration = (animationDuration * item.percent) / 100;
      const delay = (animationDuration * filled) / 100;
      circle.setAttribute('r', String(radius));
      circle.setAttribute('cx', cx);
      circle.setAttribute('cy', cy);
      circle.setAttribute('fill', 'transparent');
      circle.setAttribute('stroke', EXPENDITURE_CATEGORY[item.category]);
      circle.setAttribute('stroke-width', strokeWidth);
      circle.setAttribute('stroke-dasharray', String(dashArray));
      circle.setAttribute('stroke-dashoffset', String(dashArray));
      circle.setAttribute('transform', 'rotate(' + angle + ' ' + cx + ' ' + cy + ')');
      circle.style.transition = 'stroke-dashoffset ' + currentDuration + 'ms linear ' + delay + 'ms';
      filled += item.percent;
      $svg.appendChild(circle);
      setTimeout(() => {
        circle.setAttribute('stroke-dashoffset', String(dashOffset));
      }, 100);
    });
  }
}
