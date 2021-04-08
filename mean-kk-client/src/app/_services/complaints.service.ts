import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Complaint } from '@_models';

const baseUrl = 'http://localhost:3000/complaint'

@Injectable({
  providedIn: 'root'
})
export class ComplaintService {

  constructor(private http: HttpClient) { }

  getAll (): Observable<Complaint[]> {
  	return this.http.get<Complaint[]> (baseUrl);
  }

  get (id: any): Observable<Complaint> {
  	return this.http.get<Complaint> (`${baseUrl}/${id}`);
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

  findByField (fieldname: string, value: any): Observable<Complaint[]> {
  	return this.http.get<Complaint[]> (`${baseUrl}?${fieldname}=${value}`);
  }

}
