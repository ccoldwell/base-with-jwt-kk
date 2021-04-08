import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';


import { AppComponent } from './app.component';
import { AlertComponent } from '@_components';
import { HomeComponent } from './home/home.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Toaster } from '@_components';

import { ErrorInterceptor } from '@_helpers';
// import { AuthInterceptor } from '@_helpers';

function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: {
        url: 'http://localhost:8080/auth',
        realm: 'CAMPAIGN_REALM',
        clientId: 'mean-kk-client',
      },
      initOptions: {
        onLoad: 'check-sso',
        silentCheckSsoRedirectUri:
          window.location.origin + '/assets/silent-check-sso.html',
      },
    });
}

@NgModule({
	declarations: [
		AppComponent,
		AlertComponent,
		Toaster,
		HomeComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		KeycloakAngularModule,
		FormsModule,
		ReactiveFormsModule,
		HttpClientModule,
		NgbModule,
	],
	providers: [{
		provide: APP_INITIALIZER,
		useFactory: initializeKeycloak,
		multi: true,
		deps: [ KeycloakService ]
	},{
		provide: HTTP_INTERCEPTORS,
		useClass: ErrorInterceptor,
		multi: true
	}
	// ,{
	// 	provide: HTTP_INTERCEPTORS,
	// 	useClass: AuthInterceptor,
	// 	multi: true
	// }
	],
	bootstrap: [ AppComponent ]
})
export class AppModule { }
