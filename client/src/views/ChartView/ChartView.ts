import { MainChartState } from '../../types';
import BarChart from '../../components/BarChart/BarChart';
import DonutChart from '../../components/DonutChart/DonutChart';
import Model from '../../models/model';
import Component from '../../utils/Component';
import './chartView.scss';

export default class ChartView extends Component<MainChartState> {
  constructor($target: HTMLElement, state: MainChartState) {
    super($target, state);
    Model.subscribe('updateHistory', (data: MainChartState) => {
      if (data.path !== '/chart') return;
      this.setState(data);
    });
  }

  mounted(): void {
    if (this.state) {
      const $donutContainer = document.querySelector('.donut-chart-container');
      const $barContainer = document.querySelector('.bar-chart-container');
      new DonutChart($donutContainer as HTMLElement, this.state);
      new BarChart($barContainer as HTMLElement, this.state);
    }
  }

  template(): string {
    if (this.state) {
      return `
      <div class="chart-container">
        <div class="main-chart-container">
          <div class="donut-chart-container"></div>
          <div class="bar-chart-container"></div>
        </div>
      </div>`;
    }
    return '';
  }
}
