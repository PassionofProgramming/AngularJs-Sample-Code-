import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ForgotPasswordRoutingModule } from './forgot-password-routing.module';
import { ForgotPasswordComponent } from './forgot-password.component';
import { OwlModule } from 'angular-owl-carousel';

@NgModule({
  imports: [
    CommonModule,
    ForgotPasswordRoutingModule,
    OwlModule
  ],
  declarations: [ForgotPasswordComponent]
})
export class ForgotPasswordModule { }
