import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Home', url: '/home', icon: 'home' },
    { title: 'Merchants', url: '/folder/merchants', icon: 'business' },
    { title: 'Facilities', url: '/folder/facilities', icon: 'storefront' },
    { title: 'Devices', url: '/folder/devices', icon: 'phone-portrait' },
    { title: 'Beacons', url: '/folder/beacons', icon: 'radio' },
    { title: 'Services', url: '/folder/services', icon: 'construct' },
  ]
  constructor() { }
}
