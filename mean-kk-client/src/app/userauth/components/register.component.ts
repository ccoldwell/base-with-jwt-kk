import { Component, OnInit } from '@angular/core';
import { AuthService, ToastService } from '@_services';
import { first } from 'rxjs/operators';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
	form           !: FormGroup;
	isSuccessful   = false;
	isSignUpFailed = false;
	errorMessage   = '';
	submitted      = false;
	loading = false;

	constructor (
	    private formBuilder  : FormBuilder,
		private authService  : AuthService,
		private router       : Router,
		private toaster      : ToastService
	) {}

	ngOnInit(): void {
		this.form = this.formBuilder.group ({
			email : ['', Validators.required],
			password : ['', [Validators.required, Validators.minLength (6)]],
			firstName : ['', Validators.required],
			lastName : ['', Validators.required]
		})
	}

	get f() { return this.form.controls; }

	onSubmit(): void {
		this.submitted = true;
		// stop here if form is invalid
		if (this.form.invalid) return;
		this.loading = true;
		this.register();
	}

	private register(): void {
		this.authService.register(this.form.value).pipe(first()).subscribe (data => {
			console.log(data);
			this.isSuccessful = true;
			this.isSignUpFailed = false;
			this.toaster.success('Registered Successfully');
			this.router.navigate(['/auth/login']);
		})
		.add(() => this.loading = false);
	}
}
