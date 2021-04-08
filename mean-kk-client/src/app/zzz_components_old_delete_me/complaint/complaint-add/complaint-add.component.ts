import { Complaint } from '@models/complaint';
import { ComplaintService } from '@_services';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
	selector: 'app-complaint-add',
	templateUrl: './complaint-add.component.html',
	styleUrls: ['./complaint-add.component.css']
})
export class ComplaintAddComponent implements OnInit {

	complaintForm = this.fb.group({
		title: [null, Validators.required],
		description: [null, Validators.required],
	});

	complaint: Complaint = {
		title         : '',
		published : false,
		description   : ''
	};

	submitted = false;

	constructor (private fb: FormBuilder, private complaintService: ComplaintService) { };

	ngOnInit(): void {
	};

	saveComplaint (): void {
		if (this.complaintForm.valid) {
			const data = {
				title         : this.complaint.title,
				published : false,
				description   : this.complaint.description
			}
			this.complaintService.create (data).subscribe ( response => {
				console.log (response);
				this.submitted = true;
			},
			error => {
				console.log (error);
			});
		}
	};


	newComplaint (): void {
		this.submitted = false;
		this.complaint = {
			title         : '',
			published : false,
			description   : ''
		};
	};


}
