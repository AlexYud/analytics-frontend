import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChartService {
  public chartNumberId: number = -1;

  constructor() { }

  addChartNumberId() {
    this.chartNumberId++;
  }

  getChartId() {
    if (this.chartNumberId === 3) this.chartNumberId = -1;
    this.chartNumberId++;
    return String(this.chartNumberId);
  }
}
