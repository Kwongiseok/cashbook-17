import { EXPENDITURE_CATEGORY } from '../../constants/category';
import { ExpenditureDataList, HistoryState, MainChartState } from '../../types';
import Component from '../../utils/Component';
import './donutChart.scss';

export default class DonutChart extends Component<MainChartState> {
  constructor($target: HTMLElement, state: MainChartState) {
    super($target, state);
  }
  mounted(): void {
    if (this.state.data) {
      const $container = document.querySelector('.donut-container');
      const $svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      $svg.setAttribute('width', '100%');
      $svg.setAttribute('height', '100%');
      $svg.setAttribute('viewBox', '0 0 100 100');
      this.appendCircle($svg, this.state.data);
      $container?.appendChild($svg);
    }
  }
  template(): string {
    return '<div class="donut-container"></div>';
  }

  appendCircle($svg: SVGSVGElement, data: ExpenditureDataList): void {
    const [startAngle, radius, cx, cy, strokeWidth, animationDuration] = [-90, 30, '50', '50', '10', 700];
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
