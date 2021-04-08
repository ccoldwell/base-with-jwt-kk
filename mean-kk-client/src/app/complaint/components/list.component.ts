import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { ComplaintService } from '@_services';

import { Complaint } from '@_models';

import { KeycloakService } from 'keycloak-angular';

@Component({ templateUrl: 'list.component.html' })
export class ListComponent implements OnInit {
    complaints!: Complaint[];
    display = {
        addButton : {
            state : false,
            roles : ['admin']
        }
    };
    roles!:string[];

    constructor(private complaintService: ComplaintService, private keycloakAngular: KeycloakService) {}

    async ngOnInit () {
        let token = await this.keycloakAngular.getKeycloakInstance().tokenParsed;
        console.log (token);
        this.roles = await this.keycloakAngular.getUserRoles (true);
        console.log (this.roles);
        this.display.addButton.state = this.display.addButton.roles.every((role) => this.roles.includes(role));
        this.complaintService.getAll()
            .pipe(first())
            .subscribe(complaints => this.complaints = complaints);
    }

    deleteComplaint(id: any) {
        const complaint = this.complaints.find(x => x._id === id);
        if (!complaint) return;

        complaint.isDeleting = true;
        this.complaintService.delete(id)
            .pipe(first())
            .subscribe(() => this.complaints = this.complaints.filter(x => x._id !== id));
    }
}
