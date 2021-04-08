import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = 'http://localhost:3000/auth/';

const httpOptions = {
	headers: new HttpHeaders ({ 'Content-Type': 'application/json' })
};

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	constructor(private http: HttpClient) { }

	// -------------------------------------------------------------------------
	//
	// login expects {email:..., password:...}
	//
	// -------------------------------------------------------------------------
	login (creds:any): Observable<any> {
		return this.http.post(AUTH_API + 'signin', creds, httpOptions);
	}

	// -------------------------------------------------------------------------
	//
	// register expects {email, passowrd, firstName, lastName,roles:[]}
	// roles are not required, but helpful
	//
	// -------------------------------------------------------------------------
	register (creds:any): Observable<any> {
		return this.http.post(AUTH_API + 'signup', creds, httpOptions);
	}
}
