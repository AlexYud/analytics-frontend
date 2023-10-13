import { Component, Input, OnInit } from '@angular/core';
import Chart, { ChartTypeRegistry } from 'chart.js/auto';
import { ChartService } from 'src/app/services/chart.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent implements OnInit {
  @Input() data: any;
  @Input('type') type: keyof ChartTypeRegistry = 'bar';
  @Input('options') options: any;
  public canvasId: string = this.chartService.getChartId();
  constructor(
    public chartService: ChartService,
  ) { }

  ngOnInit() {
    // if (this.data.labels.length > 1) document.getElementsByTagName("canvas")[Number(this.canvasId)].setAttribute("id", this.canvasId);
    if (this.data.labels.length > 1) document.getElementsByTagName("canvas")[0].setAttribute("id", this.canvasId);

    var chart = new Chart(
      document.getElementById(this.canvasId) as HTMLCanvasElement,
      {
        type: this.type,
        data: this.data,
        options: this.options
      }
    );
      
    this.chartService.getDataChart().subscribe(data => {
      setTimeout(() => {
        chart.data = data;
        chart.update();
      }, 100);
    })
  }

}
