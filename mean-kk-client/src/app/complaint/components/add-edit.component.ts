import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { ComplaintService, ToastService } from '@_services';
//import { MustMatch } from '@_helpers';

@Component ({
	templateUrl: 'add-edit.component.html',
	styleUrls: ['add-edit.component.css']
})
export class AddEditComponent implements OnInit {
	form!: FormGroup;
	id!: string;
	isAddMode!: boolean;
	loading = false;
	submitted = false;

	constructor(
		private formBuilder      : FormBuilder,
		private route            : ActivatedRoute,
		private router           : Router,
		private complaintService : ComplaintService,
		private toaster          : ToastService
	) {}

	ngOnInit() {
		this.id = this.route.snapshot.params['id'];
		this.isAddMode = !this.id;

		this.form = this.formBuilder.group({
			title: ['', Validators.required],
			description: ['', Validators.required],
		});

		if (!this.isAddMode) {
			this.complaintService.get(this.id)
				.pipe(first())
				.subscribe(x => this.form.patchValue(x));
		}
	}

	// convenience getter for easy access to form fields
	get f() { return this.form.controls; }

	onSubmit() {
		this.submitted = true;


		// stop here if form is invalid
		if (this.form.invalid) {
			return;
		}

		this.loading = true;
		if (this.isAddMode) {
			this.createComplaint();
		} else {
			this.updateComplaint();
		}
	}



	private createComplaint() {
		this.complaintService.create(this.form.value)
			.pipe(first())
			.subscribe(() => {
				this.toaster.success('Complaint added');
				this.router.navigate(['../'], { relativeTo: this.route });
			})
			.add(() => this.loading = false);
	}

	private updateComplaint() {
		this.complaintService.update(this.id, this.form.value)
			.pipe(first())
			.subscribe(() => {
				this.toaster.success('Complaint updated');
				this.router.navigate(['../../'], { relativeTo: this.route });
			})
			.add(() => this.loading = false);
	}
}
