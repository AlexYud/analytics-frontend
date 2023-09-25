import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UtilsService } from '../services/utils.service';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public entityName!: string;
  public id!: string;
  public name!: string;
  private activatedRoute = inject(ActivatedRoute);

  constructor(
    public apiService: ApiService,
    public utilsService: UtilsService,
  ) { }

  ngOnInit() {
    this.entityName = this.activatedRoute.snapshot.paramMap.get('entityName') as string;
    this.id = this.activatedRoute.snapshot.paramMap.get('id') as string;
    this.name = this.activatedRoute.snapshot.paramMap.get('name') as string;
  }
}
