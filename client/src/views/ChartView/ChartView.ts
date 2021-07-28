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
    const $donutChart = document.querySelector('.donut-chart-container');
    new DonutChart($donutChart as HTMLElement, this.$state);
  }

  template(): string {
    return `<div class="main-chart-container">
      <div class="donut-chart-container"></div>
    </div>`;
  }
}
