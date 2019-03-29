import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SignupRoutingModule } from './signup-routing.module';
import { SignupComponent } from './signup.component';
import { OwlModule } from 'angular-owl-carousel';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    SignupRoutingModule,
    OwlModule,
    FormsModule, 
    ReactiveFormsModule
  ],
  declarations: [SignupComponent]
})
export class SignupModule { }
