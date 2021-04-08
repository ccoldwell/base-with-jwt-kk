import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { HomeComponent } from './home';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'complaint',
    loadChildren: () => import ('./complaint/complaint.module').then (m => m.ComplaintModule)
  },
  {
    path: 'auth',
    loadChildren: () => import ('./userauth/userauth.module').then (m => m.UserAuthModule)
  },
  {
    path: '**',
    redirectTo: ''
  }
  /*
  { path: 'org/list', component: OrgListComponent },
  { path: 'org/add', component: OrgAddComponent },
  { path: 'org/:id', component: OrgDetailComponent },
  { path: 'complaint/list', component: ComplaintListComponent },
  { path: 'complaint/add', component: ComplaintAddComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'testform', component: AddresFormComponent },
  */
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
