import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './adminlogin-routing.module';
import { LoginComponent } from './adminlogin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
    imports: [CommonModule, 
    LoginRoutingModule,
    FormsModule,
     ReactiveFormsModule
     ],
    declarations: [LoginComponent]
})
export class LoginAdminModule {}
