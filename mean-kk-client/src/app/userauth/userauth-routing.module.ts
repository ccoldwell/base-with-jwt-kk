import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// import { LoginComponent } from './components';
import { LayoutComponent, ProfileComponent, RegisterComponent } from './components';


const routes: Routes = [
    {
        path: '', component: LayoutComponent,
        children: [
            // { path: 'login', component: LoginComponent },
            { path: 'profile', component: ProfileComponent },
            { path: 'register', component: RegisterComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserAuthRoutingModule { }
