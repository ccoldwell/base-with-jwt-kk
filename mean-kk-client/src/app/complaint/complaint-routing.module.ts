import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LayoutComponent, ListComponent, AddEditComponent } from './components';

import { AuthGuard } from "@_helpers";

const routes: Routes = [{

	path: '',
	component: LayoutComponent,
	canActivate: [AuthGuard],
	data: {	roles: [] },

	children: [{
			path: '',
			component: ListComponent,
			canActivate: [AuthGuard],
			data: {	roles: ['user'] }
		},{
			path: 'add',
			component: AddEditComponent,
			canActivate: [AuthGuard],
			data: {	roles: ['admin'] }
		},{
			path: 'edit/:id',
			component: AddEditComponent,
			canActivate: [AuthGuard],
			data: {	roles: ['admin', 'user'] }
		}]
}];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class ComplaintRoutingModule { }
