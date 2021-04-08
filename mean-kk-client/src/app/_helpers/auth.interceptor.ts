import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

import { TokenStorageService } from '@_services';

const TOKEN_HEADER_KEY = 'x-access-token';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
	constructor(private token: TokenStorageService) { }

	// -------------------------------------------------------------------------
	//
	// for all https requests of ay type, see if we have an existing jwt token
	// and if so inject it into the header by cloning the request. take either
	// the clone or original request and pass to next
	//
	// -------------------------------------------------------------------------
	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		let authReq = req;
		const token = this.token.getToken();
		if (token != null) {
			authReq = req.clone({ headers: req.headers.set(TOKEN_HEADER_KEY, token) });
		}
		return next.handle(authReq);
	}
}
