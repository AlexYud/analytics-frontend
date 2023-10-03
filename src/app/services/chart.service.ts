import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChartService {
  public chartNumberId: number = -1;
  public dataChart: Subject<any> = new Subject();

  constructor() { }

  addChartNumberId() {
    this.chartNumberId++;
  }

  getChartId() {
    if (this.chartNumberId === 3) this.chartNumberId = -1;
    this.chartNumberId++;
    return String(this.chartNumberId);
  }

  setDataChart(data: any) {
    this.dataChart.next(data);
  }

  getDataChart() {
    return this.dataChart.asObservable();
  }
}
