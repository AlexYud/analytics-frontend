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
  public id!: number;
  public name!: string;
  private activatedRoute = inject(ActivatedRoute);
  public headerNavBar: any[] = []

  constructor(
    public apiService: ApiService,
    public utilsService: UtilsService,
  ) { }

  ngOnInit() {
    this.entityName = this.activatedRoute.snapshot.paramMap.get('entityName') as string;
    this.id = Number(this.activatedRoute.snapshot.paramMap.get('id') as string);
    this.name = this.activatedRoute.snapshot.paramMap.get('name') as string;

    if (this.id !== -1) {
      this.utilsService.setHistoric({
        name: this.name.split('"').join(""),
        url: `folder/${this.entityName}/${this.id}/${this.name.split('"').join("")}`
      });
      console.log('get historic: ', this.utilsService.getHistoric());
      this.headerNavBar = this.utilsService.getHistoric();
    }
  }

  goTo(url: string) {
    this.utilsService.changeHistoric(url);

  }
}
