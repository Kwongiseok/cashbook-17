import BarChart from '../../components/BarChart/BarChart';
import DonutChart from '../../components/DonutChart/DonutChart';
import Model from '../../models/model';
import Component from '../../utils/Component';

export default class ChartView extends Component {
  constructor($target: HTMLElement, state: Object) {
    super($target, state);
    Model.subscribe('statechange', (data: any) => {
      if (data.path !== '/chart') return;
      this.setState(data);
    });
  }

  mounted(): void {
    new DonutChart(document.querySelector('.donut-chart-container') as HTMLElement, this.$state);
    // new BarChart(document.querySelector('.bar-chart-container') as HTMLElement, this.$state);
  }

  template(): string {
    if (this.$state) {
      return `<div class="main-chart-container">
      <div class="donut-chart-container">
      <div class="bar-chart-container">
    </div>`;
    }
    return '';
  }
}
