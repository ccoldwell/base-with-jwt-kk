import {Component, TemplateRef} from '@angular/core';

import {ToastService} from '@_services';


@Component({
  selector: 'app-toasts',
  template: `
    <ngb-toast
      *ngFor="let toast of toastService.toasts"
      [class]="toast.classname"
      [autohide]="true"
      [delay]="toast.delay || 5000"
      (hidden)="toastService.remove(toast)"
    >
      <ng-template [ngIf]="isTemplate(toast)" [ngIfElse]="text">
        <ng-template [ngTemplateOutlet]="toast.textOrTpl"></ng-template>
      </ng-template>

      <ng-template #text><div [innerHTML]="toast.textOrTpl"></div></ng-template>


    </ngb-toast>
  `,
  host: {'[class.ngb-toasts]': 'true'}
})
export class Toaster {
  constructor(public toastService: ToastService) {}

  isTemplate(toast: any) { return toast.textOrTpl instanceof TemplateRef; }
}
//      <ng-template #text>{{ toast.textOrTpl }}</ng-template>
