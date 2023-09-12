import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public url: string = 'http://ec2-54-94-46-68.sa-east-1.compute.amazonaws.com:3000/';
  public entities: string[] = ['merchants', 'facilities', 'environments', 'beacons', 'devices', 'services']

  constructor(private http: HttpClient) { }

  nextEntity(entityName: string) {
    const index = this.entities.indexOf(entityName);
    return this.entities[index + 1];
  }

  add(entityName: string, name: string): Observable<any> {
    console.log(`adding: ${entityName}/`);
    if (entityName === 'beacons') return this.http.post<any>(`${this.url}${entityName}/`, { publicIdentifier: name });
    return this.http.post<any>(`${this.url}${entityName}/`, { name });
  }

  linkToParent(entityName: string, parentId: number, id: number): Observable<any> {
    // if (entityName === 'beacons') return this.http.post<any>(`${this.url}${entityName}/`, { publicIdentifier: name });
    console.log(`linking: ${entityName}/${parentId}/${this.nextEntity(entityName)}`);

    switch (this.nextEntity(entityName)) {
      case 'facilities':
        return this.http.post<any>(`${this.url}${entityName}/${parentId}/${this.nextEntity(entityName)}`, { facility_id: id });
      case 'environments':
        return this.http.post<any>(`${this.url}${entityName}/${parentId}/${this.nextEntity(entityName)}`, { environment_id: id });
      case 'beacons':
        return this.http.post<any>(`${this.url}${entityName}/${parentId}/${this.nextEntity(entityName)}`, { beacon_id: id });
      default:
        console.log("api service link default");
        return this.http.post<any>(`${this.url}${entityName}/${parentId}/${this.nextEntity(entityName)}`, { id });
    }
  }

  get(entityName: string, id: number): Observable<any> {
    console.log(`req: ${entityName}/${id}/${this.nextEntity(entityName)}`);
    
    if (id === -1) {
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

  delete(entityName: string, id: number): Observable<any> {
    return this.http.delete<any>(`${this.url}${entityName}/${id}`);
  }
}