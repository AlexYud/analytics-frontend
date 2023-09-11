import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public url: string = 'http://ec2-54-94-134-210.sa-east-1.compute.amazonaws.com:3000/';

  constructor(private http: HttpClient) { }

  add(entityName: string, data: any): Observable<any> {
    const { name } = data;
    if (entityName === 'beacons') return this.http.post<any>(`${this.url}${entityName}/`, { publicIdentifier: name });
    return this.http.post<any>(`${this.url}${entityName}/`, { name });
  }

  get(entityName: string): Observable<any> {
    return this.http.get<any>(`${this.url}${entityName}/`);
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