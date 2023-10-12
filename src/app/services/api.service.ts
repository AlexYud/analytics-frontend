import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public config: any = {
    server: {
      protocol: "http",
      host: "ec2-54-94-35-89.sa-east-1.compute.amazonaws.com",
      port: "3000"
    },
    templates: [
      {
        name: "Test",
        merchants: [
          {
            name: "Chicken fil A",
            facilities: [
              {
                name: "Kissimmee",
                environments: [
                  {
                    name: "Main Store - Ground Floor",
                    url: 'https://www.google.com',
                    beacons: [
                      { publicIdentifier: "3cc9ea23bb44f5b16db4add2ace1a821", url: "https://www.example.com", distance: 0.3 },
                      { publicIdentifier: "bed3d713a50d60a0ae2101bf70538e1e", url: "https://www.example.com", distance: 0.3 },
                      { publicIdentifier: "a5a1aa06f8d989cad3b225bef2e7a12a", url: "https://www.example.com", distance: 0.3 },
                      { publicIdentifier: "6b7bd82aaeec42b25c7d56a166b3cf1b", url: "https://www.example.com", distance: 0.3 },
                      { publicIdentifier: "a861d13f23b24a473c4a8e025c4a4639", url: "https://www.example.com", distance: 0.3 },
                      { publicIdentifier: "7d271f9816b38ccdc02c1c406cc65732", url: "https://www.example.com", distance: 0.3 },
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
  public url: string = `${this.config.server.protocol}://${this.config.server.host}:${this.config.server.port}/`;
  public entities: string[] = ['merchants', 'facilities', 'environments', 'beacons', 'devices', 'services']
  public isService: boolean = false;

  constructor(
    private http: HttpClient,
  ) {
    this.http.get('../../assets/data/luoggoConfig.json').subscribe({
      next: (res) => this.config = res,
      error: (error) => console.log(error)
    });
  }

  nextEntity(entityName: string) {
    const index = this.entities.indexOf(entityName);
    return this.entities[index + 1];
  }

  add(entityName: string, name: string, url?: string, distance?: number): Observable<any> {
    console.log(`adding: ${entityName}/`);

    if (entityName === 'beacons') return this.http.post<any>(`${this.url}${entityName}/`, { publicIdentifier: name, url, distance });
    if (entityName === 'environments') return this.http.post<any>(`${this.url}${entityName}/`, { name, url });
    return this.http.post<any>(`${this.url}${entityName}/`, { name });
  }

  addService(beacon_id: string, name: string): Observable<any> {
    return this.http.post<any>(`${this.url}beacons/${beacon_id}/services/`, { name });
  }

  linkToParent(entityName: string, parentId: number, id: string): Observable<any> {
    console.log(`linking: ${entityName}/${parentId}/${this.nextEntity(entityName)}`);

    if (this.isService) return this.http.post<any>(`${this.url}beacons/${parentId}/services`, { service_id: id });

    switch (this.nextEntity(entityName)) {
      case 'facilities':
        return this.http.post<any>(`${this.url}${entityName}/${parentId}/${this.nextEntity(entityName)}`, { facility_id: id });
      case 'environments':
        return this.http.post<any>(`${this.url}${entityName}/${parentId}/${this.nextEntity(entityName)}`, { environment_id: id });
      case 'beacons':
        return this.http.post<any>(`${this.url}${entityName}/${parentId}/${this.nextEntity(entityName)}`, { beacon_id: id });
      case 'devices':
        return this.http.post<any>(`${this.url}${entityName}/${parentId}/${this.nextEntity(entityName)}`, { device_id: id });
      default:
        console.log("api service link default");
        return this.http.post<any>(`${this.url}${entityName}/${parentId}/${this.nextEntity(entityName)}`, { id });
    }
  }

  get(entityName: string, id: string): Observable<any> {
    if (this.isService) {
      // console.log(`get: beacons/${id}/services`);
      return this.http.get<any>(`${this.url}beacons/${id}/services`);
    }
    console.log(`get: ${entityName}/${id}/${this.nextEntity(entityName)}`);

    if (id === '-1') {
      // console.log(`getting: ${entityName}/`);
      return this.http.get<any>(`${this.url}${entityName}/`);
    };
    // console.log(`getting: ${entityName}/${id}/${this.nextEntity(entityName)}`);
    return this.http.get<any>(`${this.url}${entityName}/${id}/${this.nextEntity(entityName)}`);
  }

  update(entityName: string, data: any): Observable<any> {
    const { name } = data;
    if (entityName === 'beacons') return this.http.put<any>(`${this.url}${entityName}/`, { publicIdentifier: name });
    return this.http.post<any>(`${this.url}${entityName}/`, { name });
  }

  delete(entityName: string, id: string): Observable<any> {
    return this.http.delete<any>(`${this.url}${entityName}/${id}`);
  }

  executeThemeScript(theme: string) {
    console.log("theme: ", theme);

    this.http.delete<any>(`${this.url}devices/`).subscribe({
      next: (res) => this.http.delete<any>(`${this.url}beacons/`).subscribe({
        next: (res) => this.http.delete<any>(`${this.url}environments/`).subscribe({
          next: (res) => this.http.delete<any>(`${this.url}facilities/`).subscribe({
            next: (res) => this.http.delete<any>(`${this.url}merchants/`).subscribe({
              next: (res) => {
                const configScript = this.config.templates.filter((template: any) => template.name === theme)[0];
                console.log("configScript: ", configScript);
                this.addMerchants(configScript.merchants);
              },
              error: (error) => console.log(error)
            }),
            error: (error) => console.log(error)
          }),
          error: (error) => console.log(error)
        }),
        error: (error) => console.log(error)
      }),
      error: (error) => console.log(error)
    });
  }

  addMerchants(merchants: any[]) {
    for (let index = 0; index < merchants.length; index++) {
      const merchant = merchants[index];
      console.log('merchant: ', merchant);
      this.add('merchants', merchant.name).subscribe({
        next: (res) => {
          this.addFacilities(merchant.facilities, res.id);
        },
        error: (error) => console.log(error)
      })
    }
  }

  addFacilities(facilities: any[], parentId: number) {
    // console.log("facilites: ", facilities);
    for (let index = 0; index < facilities.length; index++) {
      const facility = facilities[index];
      console.log('facility: ', facility);
      this.add('facilities', facility.name).subscribe({
        next: (res) => {
          this.linkToParent('merchants', parentId, res.id).subscribe({
            next: (res) => console.log(res),
            error: (error) => console.log(error)
          })
          this.addEnvironments(facility.environments, res.id);
        },
        error: (error) => console.log(error)
      })
    }
  }

  addEnvironments(environments: any[], parentId: number) {
    // console.log("facilites: ", facilities);
    for (let index = 0; index < environments.length; index++) {
      const environment = environments[index];
      console.log('environment: ', environment);
      this.add('environments', environment.name, environment.url).subscribe({
        next: (res) => {
          this.linkToParent('facilities', parentId, res.id).subscribe({
            next: (res) => console.log(res),
            error: (error) => console.log(error)
          })
          this.addBeacons(environment.beacons, res.id);
        },
        error: (error) => console.log(error)
      })
    }
  }

  addBeacons(beacons: any[], parentId: number) {
    // console.log("facilites: ", facilities);
    for (let index = 0; index < beacons.length; index++) {
      const beacon = beacons[index];
      console.log('beacon: ', beacon);
      this.add('beacons', beacon.publicIdentifier, beacon.url, beacon.distance).subscribe({
        next: (res) => {
          this.linkToParent('environments', parentId, res.id).subscribe({
            next: (res) => console.log(res),
            error: (error) => console.log(error)
          })
        },
        error: (error) => console.log(error)
      })
    }
  }
}