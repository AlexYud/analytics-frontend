import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Facilities', url: '/facilities', icon: 'log-in' },
    { title: 'Merchants', url: '/merchants', icon: 'qr-code' },
    { title: 'Services', url: '/services', icon: 'construct' },
    { title: 'Devices', url: '/devices', icon: 'home' },
    { title: 'Beacons', url: '/beacons', icon: 'home' },
  ]
  constructor() {}
}
