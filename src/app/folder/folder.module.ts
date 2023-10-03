import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FolderPageRoutingModule } from './folder-routing.module';

import { FolderPage } from './folder.page';
import { TableComponent } from '../components/table/table.component';
import { EditModalComponent } from '../components/edit-modal/edit-modal.component';
import { TableServicesComponent } from '../components/table-services/table-services.component';
import { NgChartsModule } from 'ng2-charts';
import { ChartComponent } from '../components/chart/chart.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FolderPageRoutingModule,
    NgChartsModule,
  ],
  declarations: [
    FolderPage,
    TableComponent,
    TableServicesComponent,
    EditModalComponent,
    ChartComponent,
  ]
})
export class FolderPageModule { }
