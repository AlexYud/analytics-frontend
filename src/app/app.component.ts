import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Facilities', url: '/folder/facilities', icon: 'business' },
    { title: 'Merchants', url: '/folder/merchants', icon: 'storefront' },
    { title: 'Services', url: '/folder/services', icon: 'hammer' },
    { title: 'Devices', url: '/folder/devices', icon: 'phone-portrait' },
    { title: 'Beacons', url: '/folder/beacons', icon: 'radio' },
  ]
  constructor() { }
}
