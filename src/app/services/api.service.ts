import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public url: string = 'http://ec2-54-94-134-210.sa-east-1.compute.amazonaws.com:3000/';

  constructor(private http: HttpClient) { }

  get(entityName: string): Observable<any> {
    return this.http.get<any>(`${this.url}${entityName}/`);
  }

  add(entityName: string, name: string): Observable<any> {
    if (entityName === 'beacons') return this.http.post<any>(`${this.url}${entityName}/`, { publicIdentifier: name });
    return this.http.post<any>(`${this.url}${entityName}/`, { name });
  }

  delete(entityName: string, id: number): Observable<any> {
    return this.http.delete<any>(`${this.url}${entityName}/${id}`);
  }
}