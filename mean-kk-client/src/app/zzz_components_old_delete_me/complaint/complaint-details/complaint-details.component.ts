import { Component, OnInit } from '@angular/core';
import { Complaint } from '@models/complaint';
import { ComplaintService } from '@_services';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
	selector: 'app-complaint-details',
	templateUrl: './complaint-details.component.html',
	styleUrls: ['./complaint-details.component.css']
})
export class ComplaintDetailsComponent implements OnInit {

	currentComplaint: Complaint = {
		_id            : '',
		title         : '',
		published     : false,
		description   : ''
	};
	message = '';

	constructor (private dataservice: ComplaintService, private route: ActivatedRoute, private router: Router) { };

	ngOnInit(): void {
		this.message = '';
		this.getComplaint (this.route.snapshot.params.id);
	}

	getComplaint (id: string): void {
		this.dataservice.get (id).subscribe (data => {
			this.currentComplaint = data;
			console.log (data);
		},
		error => {
			console.log (error);
		});
	}

	deleteComplaint (): void {
		this.dataservice.delete (this.currentComplaint._id).subscribe (resp => {
			console.log (resp);
			this.message = resp.message;
		},
		error => {
			console.log (error);
		});
	}

	updateComplaint (): void {
		this.dataservice.update (this.currentComplaint._id, this.currentComplaint).subscribe (resp => {
			console.log (resp);
			this.message = resp.message;
		},
		error => {
			console.log (error);
		});
	}

	updatePublished (status: boolean) {
		const data = {
			title         : this.currentComplaint.title,
			published     : status,
			description   : this.currentComplaint.description
		};
		this.dataservice.update (this.currentComplaint._id, data).subscribe (resp => {
			console.log (resp);
			this.message = resp.message;
			this.currentComplaint.published = status;
		},
		error => {
			console.log (error);
		});

	}

}
