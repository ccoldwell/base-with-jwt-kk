import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ComplaintRoutingModule } from './complaint-routing.module';
import { LayoutComponent, ListComponent, AddEditComponent } from './components';


@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        ComplaintRoutingModule
    ],
    declarations: [
        LayoutComponent,
        ListComponent,
        AddEditComponent
    ]
})
export class ComplaintModule { }
