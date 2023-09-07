import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-bubble-chart',
  templateUrl: './bubble-chart.component.html',
  styleUrls: ['./bubble-chart.component.scss'],
})
export class BubbleChartComponent  implements OnInit {

  constructor() { }

  ngOnInit() {
    const data = {
      datasets: [{
        label: 'First Dataset',
        data: [{
          x: 20,
          y: 30,
          r: 15
        }, {
          x: 40,
          y: 10,
          r: 10
        }],
        backgroundColor: 'rgb(255, 99, 132)'
      }]
    };

    new Chart(
      document.getElementById('bubbleChart') as HTMLCanvasElement,
      {
        type: 'bubble',
        data: data,
        options: {}
      }
    );
  }

}
