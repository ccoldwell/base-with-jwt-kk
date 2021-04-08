import { Component, OnInit } from '@angular/core';

import { ToastService } from '@_services';

import { TokenStorageService } from '@_services';
import { KeycloakService } from 'keycloak-angular';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {

	isLoggedIn = false;
	username?: string;

	keycloak?:any
	logouturi: string;

	title = 'meank-client';
	private roles: string[] = [];


	constructor(public toastService: ToastService, private tokenStorageService: TokenStorageService, protected readonly keycloakService: KeycloakService) {
		this.keycloak = this.keycloakService.getKeycloakInstance();
		this.logouturi = this.keycloak.authServerUrl + '/protocol/openid-connect/logout?redirect_uri=' + encodeURIComponent(window.location.origin);
	}

	showStandard() {
		this.toastService.show('I am a standard toast');
	}

	showSuccess() {
		this.toastService.show('I am a success toast', { classname: 'bg-success text-light', delay: 10000 });
	}

	showDanger(dangerTpl: any) {
		this.toastService.show(dangerTpl, { classname: 'bg-danger text-light', delay: 15000 });
	}

	ngOnInit(): void {

		console.log ('keycloak.authenticated = ', this.keycloak.authenticated);
		this.isLoggedIn = this.keycloak.authenticated;

		// this.keycloakService.isLoggedIn (). then ((result) => {
		// 	console.log ('result = ', result);
		// 	this.isLoggedIn = result;
		// 	if (this.isLoggedIn) {
		// 		this.keycloak = this.keycloakService.getKeycloakInstance();
		// 		let token = this.keycloak.tokenParsed;
		// 		this.roles = token.resource_access['mean-kk-client']['roles'];
		// 		this.username = token.given_name;
		// 	}
		// })
		// .catch (() => {
		// 	this.isLoggedIn = false;
		// 	this.roles = [];
		// 	this.username = '';
		// });

		// let token = this.keycloak.tokenParsed;
		// this.isLoggedIn = !!token.jti;
		// console.log ('this.isLoggedIn', this.isLoggedIn);
		// if (this.isLoggedIn) {
		// 	this.roles = token.resource_access['mean-kk-client']['roles'];
		// 	this.username = token.given_name;
		// }

		// this.isLoggedIn = !!this.tokenStorageService.getToken();
		// console.log ('this.isLoggedIn', this.isLoggedIn);
		// if (this.isLoggedIn) {
		// 	const user = this.tokenStorageService.getUser();
		// 	this.roles = user.roles;
		// 	this.username = user.name;
		// }
	}

	logout(): void {
		// https://keycloak_host/auth/realms/insert_realm_here/protocol/openid-connect/logout?redirect_uri=<your-app-host/optional-whitelisted-url-where-you-say-goodbye-to-users>
		this.keycloak = this.keycloakService.getKeycloakInstance();
		console.log (this.keycloak);
		// let uri = this.keycloak.getRealmUrl ();
		// let uri =  this.keycloak.createLogoutUrl({
		// 	redirectUri: window.location.origin
		// });
		// // + '/protocol/openid-connect/logout?redirect_uri=' + encodeURIComponent(window.location.origin)
		// console.log (uri);
		// this.keycloak.logout().then(() => this.keycloak.clearToken());
		this.keycloak.logout ({
			redirectUri: window.location.origin
		});
		// this.keycloakService.logout (window.location.origin);
	}
	login(): void {
		this.keycloakService.login ({
			redirectUri: window.location.origin
		})
		.catch ((err:any) => console.log ('login error', err));
	}



}
