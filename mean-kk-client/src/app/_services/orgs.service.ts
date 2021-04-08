import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Org } from '@_models';

const baseUrl = 'http://localhost:3000/api/org'

@Injectable({
  providedIn: 'root'
})
export class OrgsService {

  constructor(private http: HttpClient) { }

  getAll (): Observable<Org[]> {
  	return this.http.get<Org[]> (baseUrl);
  }

  get (id: any): Observable<Org> {
  	return this.http.get<Org> (`${baseUrl}/${id}`);
  }

  create (data: any): Observable<any> {
  	return this.http.post (baseUrl, data);
  }

  update (id: any, data: any): Observable<any> {
  	return this.http.put (`${baseUrl}/${id}`, data);
  }

  delete (id: any): Observable<any> {
  	return this.http.delete (`${baseUrl}/${id}`);
  }

  deleteAll (): Observable<any> {
  	return this.http.delete (baseUrl);
  }

  findByEmail (email: any): Observable<Org[]> {
  	return this.http.get<Org[]> (`${baseUrl}?email=${email}`);
  }

}
