import { Component } from '@angular/core';
import { ApiService } from './services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    // { title: 'Home', url: '/home', icon: 'home' },
    { title: 'Merchants', url: '/folder/merchants/-1/all', icon: 'briefcase' },
    // { title: 'Facilities', url: '/folder/facilities', icon: 'business' },
    // { title: 'Environments', url: '/folder/environments', icon: 'layers' },
    // { title: 'Beacons', url: '/folder/beacons', icon: 'radio' },
    // { title: 'Devices', url: '/folder/devices', icon: 'phone-portrait' },
    // { title: 'Services', url: '/folder/services', icon: 'construct' },
    // { title: 'Analytics', url: '/analytics', icon: 'bar-chart' },
  ]
  public templates: any[] = []
  constructor(
    private router: Router,
    private apiService: ApiService,
  ) { }

  ngOnInit() {
    setTimeout(() => this.templates = this.apiService.config.templates, 1000);
    this.apiService.getTemplateChanged().subscribe(async res => {
      await this.router.navigate(['/folder/merchants/-1/all']);
    });
  }

  handleSelectChange(event: any) {
    // console.log(event.target.value);
    this.apiService.setTemplateChanged();
    this.apiService.executeThemeScript(event.target.value);
  }
}
