import { Injectable, TemplateRef } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ToastService {
  toasts: any[] = [];

  show(textOrTpl: string | TemplateRef<any>, options: any = {}) {
    this.toasts.push({ textOrTpl, ...options });
  }

  success (text: string) {
  	this.show(text, { classname: 'bg-success text-light', delay: 5000 });
  }

  error (text: string) {
  	this.show(text, { classname: 'bg-danger text-light', delay: 9000 });
  }

  warning (text: string) {
  	this.show(text, { classname: 'bg-warning text-dark', delay: 8000 });
  }

  info (text: string) {
  	this.show(text, { classname: 'bg-info text-light', delay: 5000 });
  }

  remove(toast: any) {
    this.toasts = this.toasts.filter(t => t !== toast);
  }
}
