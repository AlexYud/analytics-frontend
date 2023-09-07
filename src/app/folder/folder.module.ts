import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FolderPageRoutingModule } from './folder-routing.module';

import { FolderPage } from './folder.page';
import { ChartComponent } from '../components/chart/chart.component';
import { NgChartsModule } from 'ng2-charts';
import { BarChartComponent } from '../components/bar-chart/bar-chart.component';
import { LineChartComponent } from '../components/line-chart/line-chart.component';
import { DoughnutChartComponent } from '../components/doughnut-chart/doughnut-chart.component';
import { BubbleChartComponent } from '../components/bubble-chart/bubble-chart.component';
import { ScatterChartComponent } from '../components/scatter-chart/scatter-chart.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FolderPageRoutingModule,
    NgChartsModule
  ],
  declarations: [
    FolderPage,
    ChartComponent,
    BarChartComponent,
    LineChartComponent,
    DoughnutChartComponent,
    BubbleChartComponent,
    ScatterChartComponent,
  ]
})
export class FolderPageModule {}
