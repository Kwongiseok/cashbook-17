import { CATEGORY, HistoryState } from '../../types';
import { CATEGORY_COLOR } from '../../constants/category';
import Component from '../../utils/Component';
import './lineChart.scss';

type LineChartState = {
  year?: number;
  month?: number;
  category: CATEGORY;
};

const gridSize = {
  row: 26,
  col: 33,
};

export default class LineChart extends Component<LineChartState> {
  constructor($target: HTMLElement, state: LineChartState) {
    super($target, state);
  }

  template() {
    const category = this.getCategory(),
      categoryColor = this.getCategoryColor(category);
    return `
      <div class="linechart-header"><span style="color: ${categoryColor}">${category}</span> 카테고리 소비 추이</div>
      <div class="linechart-body">
        <canvas id="graph"></canvas>
      </div>
    `;
  }

  mounted() {
    this.registerChart();
  }

  registerChart() {
    const dummy = [616929, 509637, 563283, 590106, 643752, 568647, 536460];
    this.drawGraph(dummy);
  }

  getCategory() {
    return this.state.category;
  }

  getCategoryColor(category: CATEGORY) {
    return CATEGORY_COLOR[category];
  }

  async drawGraph(data: number[]) {
    const cvs = document.getElementById('graph') as HTMLCanvasElement;
    cvs.height = 320 * 2;
    cvs.width = 850 * 2;
    const ctx = cvs.getContext('2d') as CanvasRenderingContext2D;
    let start: number;

    const height = cvs.height - 60,
      width = cvs.width - 20;
    const convertedData = this.convertDataToCanvasValue(data, width, height / 3);
    const draw = (timestamp: number) => {
      if (start === undefined) start = timestamp;
      const animationIndex = (timestamp - start) / 100;

      ctx.beginPath();
      ctx.clearRect(0, 0, width, height + 10);
      this.drawGrid(ctx, width, height);
      this.drawChart(ctx, animationIndex, height, convertedData);

      if (animationIndex <= 20) {
        window.requestAnimationFrame(draw);
      }
    };

    window.requestAnimationFrame(draw);
    this.drawMonth(ctx, width, height);
  }

  drawMonth(ctx: CanvasRenderingContext2D, width: number, height: number) {
    const currentMonth = this.state.month as number;
    const months = this.getMonths(currentMonth);
    ctx.beginPath();
    ctx.font = 'normal 18px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'bottom';
    ctx.fillStyle = '#8D9393';
    ctx.strokeStyle = '#8D9393';
    ctx.lineWidth = 2;
    months.forEach((_month, i) => {
      ctx.fillText(String(months[i]), 10 + (width / 11) * i, height + 40);
    });
    ctx.closePath();
  }

  getMonths(month: number) {
    const currentMonth = month;
    return [...Array(12).keys()].map((d, i) => {
      let result = i + currentMonth - 5;
      if (result <= 0) result += 12;
      if (12 / result < 1) result %= 12;
      return result;
    });
  }

  drawGrid(ctx: CanvasRenderingContext2D, width: number, height: number) {
    ctx.lineWidth = 4;
    ctx.strokeStyle = '#F5F5F5';
    ctx.beginPath();
    for (let count = 2; count <= height + 2; count += height / 12) {
      ctx.moveTo(10, count);
      ctx.lineTo(width + 10, count);
    }
    for (let count = 10; count <= width + 10; count += width / 22) {
      ctx.moveTo(count, 0);
      ctx.lineTo(count, height);
    }
    ctx.stroke();
    ctx.closePath();
  }

  drawChart(
    ctx: CanvasRenderingContext2D,
    animationIndex: number,
    height: number,
    data: Array<{ x: number; y: number; data: number }>
  ) {
    ctx.lineWidth = 4;
    ctx.strokeStyle = '#A0E1E0';
    ctx.beginPath();
    data.forEach((value, i) => {
      const x = value.x,
        y = height - ((height - value.y) / 20) * animationIndex;
      if (i == 0) {
        ctx.moveTo(x, y);
        ctx.textAlign = 'start';
      } else {
        ctx.lineTo(x, y);
        ctx.textAlign = 'center';
      }
    });
    ctx.stroke();
    ctx.closePath();

    ctx.lineWidth = 2;
    ctx.font = 'normal 22px Arial';
    ctx.textBaseline = 'bottom';
    data.forEach((value, i) => {
      ctx.beginPath();
      const x = value.x,
        y = height - ((height - value.y) / 20) * animationIndex;
      ctx.fillStyle = '#2AC1BC';
      ctx.strokeStyle = '#2AC1BC';
      if (i == data.length - 1) {
        ctx.fillStyle = '#219A95';
        ctx.strokeStyle = '#219A95';
      }

      ctx.arc(x, y, 8, 0, Math.PI * 2);
      ctx.fill();
      ctx.closePath();

      ctx.beginPath();
      ctx.strokeStyle = '#626666';
      ctx.fillStyle = '#626666';
      if (i == data.length - 1) {
        ctx.strokeStyle = '#219A95';
      }
      ctx.textAlign = i == 0 ? 'start' : 'center';
      ctx.strokeText(value.data.toLocaleString(), x, y - 10);
      ctx.fill();
      ctx.closePath();
    });
    ctx.stroke();
  }

  convertDataToCanvasValue(data: number[], width: number, height: number) {
    const highestNumber = Math.max(...data),
      lowestNumber = Math.min(...data);

    return data.map((d, i) => {
      const x = i * (width / 11) + 10,
        y = height - ((d - lowestNumber) / (highestNumber - lowestNumber)) * (height - 3) + 50;
      return { x, y, data: d };
    });
  }
}
