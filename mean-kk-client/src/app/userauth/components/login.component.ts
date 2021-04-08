/*

import { Component, OnInit } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthService, TokenStorageService, ToastService } from '@_services';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
	form!: FormGroup;

	isLoggedIn    = false;
	isLoginFailed = false;
	errorMessage  = '';
	roles         : string[] = [];
	submitted     = false;
	loading = false;

	constructor (
	    private formBuilder  : FormBuilder,
		private authService  : AuthService,
		private tokenStorage : TokenStorageService,
		private router       : Router,
		private toaster      : ToastService
	) {}

	ngOnInit(): void {
		if (this.tokenStorage.getToken()) {
			this.isLoggedIn = true;
			this.roles = this.tokenStorage.getUser().roles;
		}

		this.form = this.formBuilder.group ({
			email : ['', Validators.required],
			password : ['', [Validators.required, Validators.minLength (6)]]
		})
	}

	get f() { return this.form.controls; }

	onSubmit(): void {
		this.submitted = true;
		// stop here if form is invalid
		if (this.form.invalid) return;
		this.loading = true;
		this.login();
	}

	private login(): void {
		this.authService.login(this.form.value).pipe(first()).subscribe (data => {
			this.tokenStorage.saveToken(data.accessToken);
			this.tokenStorage.saveUser(data);
			this.isLoginFailed = false;
			this.isLoggedIn = true;
			this.roles = this.tokenStorage.getUser().roles;
			this.toaster.success('Logged in Successfully, Welcome Back!');
			this.router.navigate(['/auth/login']);
			this.reloadPage();
		})
		.add(() => this.loading = false);
	}

	reloadPage(): void {
		window.location.reload();
	}
}
 */
