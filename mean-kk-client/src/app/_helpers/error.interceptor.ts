import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { ToastService } from '@_services';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private toaster: ToastService) {}

    // -------------------------------------------------------------------------
    //
    // for any http request, pass it along though next() then pipe all results
    // into catchError from rxjs. this will essentially catch ALL http errors
    // then take resulting errors, log them and toaster them
    //
    // -------------------------------------------------------------------------
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            console.log (err);
            console.log ('over');
            let error = '';
            if (err.error.message) error = err.error.message;
            else error = 'Status:'+err.statusText+'<br/>Message:'+err.message;
            this.toaster.error(error);
            console.error(err);
            return throwError(error);
        }))
    }
}
