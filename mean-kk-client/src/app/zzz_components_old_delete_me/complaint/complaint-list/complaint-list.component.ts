import { Component, OnInit } from '@angular/core';
import { Complaint } from '@models/complaint';
import { ComplaintService } from '@_services';

@Component({
	selector: 'app-complaint-list',
	templateUrl: './complaint-list.component.html',
	styleUrls: ['./complaint-list.component.css']
})
export class ComplaintListComponent implements OnInit {

	complaints?: Complaint[];
	currentComplaint?: Complaint;
	currentIndex = -1;
	title = '';

	constructor (private dataservice: ComplaintService) { };

	ngOnInit(): void {
		this.getAll ();
	}

	getAll (): void {
		this.dataservice.getAll ().subscribe (data => {
			this.complaints = data;
			console.log (data);
		},
		error => {
			console.log (error);
		});
	}

	refreshList (): void {
		this.getAll ();
		this.currentIndex = -1;
		this.currentComplaint = undefined;
	}

	setActiveComplaint (complaint: Complaint, index: number): void {
		this.currentComplaint = complaint;
		this.currentIndex = index;
	}

	deleteAll (): void {
		this.dataservice.deleteAll ().subscribe (response => {
			console.log (response);
			this.refreshList ();
		},
		error => {
			console.log (error);
		});
	}

	searchByTitle (): void {
		this.dataservice.findByField ('title', this.title).subscribe (data => {
			this.complaints = data;
			console.log (data);
		},
		error => {
			console.log (error);
		});
	}
}
