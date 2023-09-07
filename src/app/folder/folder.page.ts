import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder!: string;
  private activatedRoute = inject(ActivatedRoute);

  public list = [
    {
      id: '0',
      name: 'test1',
      price: '12.99',
      inventory: '1'
    },
    {
      id: '1',
      name: 'test1',
      price: '12.99',
      inventory: '1'
    },
    {
      id: '2',
      name: 'test1',
      price: '12.99',
      inventory: '1'
    },
    {
      id: '3',
      name: 'test1',
      price: '12.99',
      inventory: '1'
    },
  ]

  constructor() {}

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id') as string;
  }


}
