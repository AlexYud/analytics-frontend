import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  @Input('name') name: string = 'error';
  public data: any[] = [];

  constructor(
    private router: Router,
    private apiService: ApiService,
  ) { }

  ngOnInit() {
    this.get();
  }

  get() {
    this.apiService.get(this.name).subscribe({
      next: (res) => {
        console.log(res);
        this.data = res;
      },
      error: (err) => console.log(err)
    })
  }

  details(id: number) {
    this.router.navigate(['/details', id]);
  }

  delete(id: number) {
    this.apiService.delete(this.name, id).subscribe({
      next: (res) => {
        console.log(res);
        this.get();
      },
      error: (err) => console.log(err)
    })
  }

  add() {
    this.apiService.add(this.name, "Burger King").subscribe({
      next: (res) => {
        console.log(res);
        this.get();
      },
      error: (err) => console.log(err)
    })
  }



}
