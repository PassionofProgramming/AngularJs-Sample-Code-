import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
 import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';

import { AccountsettingRoutingModule } from './accountsetting-routing.module';
import { OwlModule } from 'angular-owl-carousel';
import { AccountsettingComponent } from './accountsetting.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
  imports: [
    CommonModule,
    AccountsettingRoutingModule,
    OwlModule,
    OwlDateTimeModule, OwlNativeDateTimeModule,
    FormsModule, 
    ReactiveFormsModule
  ],
  declarations: [AccountsettingComponent]
})
export class AccountsettingModule { }
