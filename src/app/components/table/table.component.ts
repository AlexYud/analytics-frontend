import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { UtilsService } from 'src/app/services/utils.service';
import { EditModalComponent } from '../edit-modal/edit-modal.component';
import { ChartService } from 'src/app/services/chart.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  @Input('entityName') entityName: string = 'error';
  @Input('id') id: any = '-1';
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

  public connectedUserData: number[] = [];

  public dataChartError: boolean = false;

  public dataChart = {
    labels: [
      'Environment',
    ],
    datasets: [{
      label: 'Connected Users',
      data: this.connectedUserData,
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(255, 205, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(201, 203, 207, 0.2)'
      ],
      borderColor: [
        'rgb(255, 99, 132)',
        'rgb(255, 159, 64)',
        'rgb(255, 205, 86)',
        'rgb(75, 192, 192)',
        'rgb(54, 162, 235)',
        'rgb(153, 102, 255)',
        'rgb(201, 203, 207)'
      ],
      borderWidth: 1
    }]
  }

  public optionsChart = {
    indexAxis: 'y',
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          font: {
            size: 18,
          }
        },
      },
      x: {
        beginAtZero: true,
        suggestedMax: 5,
        ticks: {
          stepSize: 1,
          font: {
            size: 18,
          }
        },
      }
    },
  };

  constructor(
    private modalCtrl: ModalController,
    private router: Router,
    public apiService: ApiService,
    public chartService: ChartService,
    public utilsService: UtilsService,
  ) { }

  ngOnInit() {
    this.apiService.isService = false;
    this.get();
    if (this.apiService.nextEntity(this.entityName) === 'beacons') setInterval(() => {
      this.get();
    }, 1000);
  }

  searchbarInput(event: any) {
    const filter = event.detail.value.toLowerCase();
    this.results = this.data.filter((data) =>
      data.name.toLowerCase().indexOf(filter) >= 0 || data.id == filter
    );
  }

  get() {
    // setTimeout(() => {
    //   const res = [
    //     {
    //       id: 'test1',
    //       devices: [{ id: 'device1' }],
    //       connectedUsers: Math.floor(Math.random() * 5),
    //     },
    //     {
    //       id: 'test2',
    //       devices: [{ id: 'device1' }],
    //       connectedUsers: Math.floor(Math.random() * 5),
    //     },
    //     {
    //       id: 'test3',
    //       devices: [{ id: 'device1' }],
    //       connectedUsers: Math.floor(Math.random() * 5),
    //     }
    //   ]
    //   this.chartData(res)
    // }, 2000)

    this.apiService.get(this.entityName, this.id).subscribe({
      next: (res) => {
        console.log("get res: ", res);
        this.data = res;
        this.results = [...this.data];
        if (this.entityName === "environments") this.chartData(res);
      },
      error: (err) => {
        this.data = [];
        this.results = [...this.data];
        this.utilsService.showToast('Could not get items', 'danger', 'close-circle');
        this.dataChartError = true;
      }
    })
  }

  chartData(data: any[]) {
    this.dataChart.labels = ['Environment'];
    this.dataChart.datasets[0].data = [];
    this.calcEnvUsers(data);
    for (let index = 0; index < data.length; index++) {
      const element = data[index];
      this.dataChart.labels.push(element.id.slice(-10))
      const connectedUsers: number = element.connectedUsers;
      this.dataChart.datasets[0].data.push(connectedUsers)
    }
  }

  calcEnvUsers(data: any[]) {
    const envConnectedUsers = new Set();
    for (let index = 0; index < data.length; index++) {
      const beacon = data[index];
      for (let index = 0; index < beacon.devices.length; index++) {
        const device = beacon.devices[index];
        envConnectedUsers.add(device.id);
      }
    }
    this.dataChart.datasets[0].data.push(envConnectedUsers.size);
    this.chartService.setDataChart(this.dataChart);
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

  details(id: any, name: string, isService: boolean) {
    this.apiService.isService = isService;
    if (this.id !== '-1') {
      if (this.entityName === 'beacons') return console.log('end');
      if (isService) return this.router.navigate([`folder/beacons/${id}/${name}`]);
      this.router.navigate([`folder/${this.apiService.nextEntity(this.entityName)}/${id}/${name}`]);
    } else {
      this.router.navigate([`folder/${this.entityName}/${id}/${name}`]);
    }
  }

  delete(id: string) {
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
    if (this.id !== '-1') {
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
    // window.location.reload();
  }

  async openModal(name: string) {
    const modal = await this.modalCtrl.create({
      component: EditModalComponent,
      cssClass: 'modal',
      componentProps: { name },
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      return data
    };
  }

}
