import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailsPageRoutingModule } from './details-routing.module';

import { DetailsPage } from './details.page';
import { NgChartsModule } from 'ng2-charts';
import { ChartComponent } from 'src/app/components/chart/chart.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailsPageRoutingModule,
    NgChartsModule,

  ],
  declarations: [
    DetailsPage,
    ChartComponent,

  ]
})
export class DetailsPageModule {}
