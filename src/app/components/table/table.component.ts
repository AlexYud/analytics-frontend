import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { UtilsService } from 'src/app/services/utils.service';
import { EditModalComponent } from '../edit-modal/edit-modal.component';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  @Input('name') name: string = 'error';
  public data: any[] = [
    {
      id: 0,
      name: 'test'
    },
    {
      id: 1,
      name: 'test1'
    },
    {
      id: 2,
      name: 'test2'
    },
  ];
  public searchTerm: string | undefined;
  public results = [...this.data];

  constructor(
    private modalCtrl: ModalController,
    private router: Router,
    private apiService: ApiService,
    public utilsService: UtilsService,
  ) { }

  ngOnInit() {
    this.get();
  }

  searchbarInput(event: any) {
    const filter = event.detail.value.toLowerCase();
    this.results = this.data.filter((data) =>
      data.name.toLowerCase().indexOf(filter) >= 0 || data.id == filter
    );
  }

  get() {
    this.apiService.get(this.name).subscribe({
      next: (res) => {
        console.log(res);
        this.data = res;
      },
      error: (err) => this.utilsService.showToast('Could not get items', 'danger', 'close-circle')
    })
  }

  async edit(obj: any) {
    const data = await this.openModal(obj);
    if (data) {
      this.apiService.add(this.name, data).subscribe({
        next: (res) => {
          console.log(res);
          this.utilsService.showToast(`Item added`, 'success', 'checkmark-circle')
          this.get();
        },
        error: (err) => this.utilsService.showToast(`Could not update item ${obj.id}`, 'danger', 'close-circle')
      })
    }
  }

  details(id: number) {
    this.router.navigate(['/details', id]);
  }

  delete(id: number) {
    this.apiService.delete(this.name, id).subscribe({
      next: (res) => {
        console.log(res);
        this.utilsService.showToast(`Item ${id} deleted`, 'success', 'checkmark-circle')
        this.get();
      },
      error: (err) => this.utilsService.showToast(`Could not delete item ${id}`, 'danger', 'close-circle'),
    })
  }

  async add() {
    const obj = { name: 'New', parent: undefined };
    const data = await this.openModal(obj);
    if (data) {
      this.apiService.add(this.name, data).subscribe({
        next: (res) => {
          console.log(res);
          this.utilsService.showToast(`Item added`, 'success', 'checkmark-circle')
          this.get();
        },
        error: (err) => this.utilsService.showToast(`Could not add item`, 'danger', 'close-circle')
      })
    }
  }

  async openModal(obj: any) {
    const modal = await this.modalCtrl.create({
      component: EditModalComponent,
      componentProps: { obj },
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      console.log(data);
      return data
    };
  }

}
