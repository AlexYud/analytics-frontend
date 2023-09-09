import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Home', url: '/home', icon: 'home' },
    { title: 'Merchants', url: '/folder/merchants', icon: 'briefcase' },
    { title: 'Facilities', url: '/folder/facilities', icon: 'business' },
    { title: 'Environments', url: '/folder/environments', icon: 'layers' },
    { title: 'Beacons', url: '/folder/beacons', icon: 'radio' },
    { title: 'Devices', url: '/folder/devices', icon: 'phone-portrait' },
    { title: 'Services', url: '/folder/services', icon: 'construct' },
  ]
  constructor() { }
}
