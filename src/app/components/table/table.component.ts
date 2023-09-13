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
  @Input('entityName') entityName: string = 'error';
  @Input('id') id: number = -1;
  @Input('name') name: string = 'all';
  // public data: any[] = [
  //   {
  //     id: 0,
  //     name: 'test'
  //   },
  //   {
  //     id: 1,
  //     name: 'test1'
  //   },
  //   {
  //     id: 2,
  //     name: 'test2'
  //   },
  // ];
  public data: any[] = [];
  public results = [...this.data];

  constructor(
    private modalCtrl: ModalController,
    private router: Router,
    public apiService: ApiService,
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
    this.apiService.get(this.entityName, this.id).subscribe({
      next: (res) => {
        this.data = res;
        this.results = [...this.data];
      },
      error: (err) => this.utilsService.showToast('Could not get items', 'danger', 'close-circle')
    })
  }

  async edit(obj: any) {
    const data = await this.openModal(obj);
    if (data) {
      this.apiService.update(this.entityName, data).subscribe({
        next: (res) => {
          console.log(res);
          this.utilsService.showToast(`Item added`, 'success', 'checkmark-circle')
          this.get();
        },
        error: (err) => this.utilsService.showToast(`Could not update item ${obj.id}`, 'danger', 'close-circle')
      })
    }
  }

  details(id: number, name: string, isService: boolean) {
    this.apiService.isService = isService;
    if (this.id !== -1) {
      if (this.entityName === 'beacons') return console.log('end');
      if (isService) return this.router.navigate([`folder/devices/${id}/${name}`]);
      this.router.navigate([`folder/${this.apiService.nextEntity(this.entityName)}/${id}/${name}`]);
    } else {
      this.router.navigate([`folder/${this.entityName}/${id}/${name}`]);
    }
  }

  delete(id: number) {
    this.apiService.delete(this.entityName, id).subscribe({
      next: (res) => {
        console.log('table component delete function response: ', res);
        this.utilsService.showToast(`Item ${id} deleted`, 'success', 'checkmark-circle')
        this.get();
      },
      error: (err) => this.utilsService.showToast(`Could not delete item ${id}`, 'danger', 'close-circle'),
    })
  }

  async add() {
    // Adding other entity
    if (this.id !== -1) {
      const name: string = await this.openModal(`New ${this.apiService.nextEntity(this.entityName).slice(0, -1)}`);
      if (name) {
        // Create entity
        this.apiService.add(this.apiService.nextEntity(this.entityName), name).subscribe({
          next: (res) => {
            console.log('table add api res: ', res);
            // Link to parent
            this.apiService.linkToParent(this.entityName, this.id, res.id).subscribe({
              next: (res) => {
                console.log('table linkToParent api res: ', res);
                this.utilsService.showToast(`Item linked`, 'success', 'checkmark-circle')
                this.data = res;
                this.results = [...this.data];
              },
              error: (err) => this.utilsService.showToast(`Could not link to item`, 'danger', 'close-circle')
            })
          },
          error: (err) => this.utilsService.showToast(`Could not add item`, 'danger', 'close-circle')
        });
      }
    } else {
      // Adding Merchant
      const name: string = await this.openModal(`New ${this.entityName.slice(0, -1)}`);
      if (name) {
        this.apiService.add(this.entityName, name).subscribe({
          next: (res) => {
            console.log('table add api res: ', res);
            this.utilsService.showToast(`Item added`, 'success', 'checkmark-circle')
            this.get();
          },
          error: (err) => this.utilsService.showToast(`Could not add item`, 'danger', 'close-circle')
        });
      }
    }
  }

  refresh() {
    this.get();
  }

  async openModal(name: string) {
    const modal = await this.modalCtrl.create({
      component: EditModalComponent,
      componentProps: { name },
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      return data
    };
  }

}
