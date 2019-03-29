import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';;
import { OwlModule } from 'angular-owl-carousel';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
  imports: [
    CommonModule,
    LoginRoutingModule,
    OwlModule,
    FormsModule, 
    ReactiveFormsModule
  ],
  declarations: [LoginComponent]
})
export class LoginModule { }
