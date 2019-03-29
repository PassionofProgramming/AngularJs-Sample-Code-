import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NeutronRatingModule } from 'neutron-star-rating';
import { MyscrimmageRoutingModule } from './myscrimmage-routing.module';
import { OwlModule } from 'angular-owl-carousel';
import { MyscrimmageComponent } from './myscrimmage.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
  imports: [
    CommonModule,
    NeutronRatingModule,
    FormsModule, ReactiveFormsModule,
    MyscrimmageRoutingModule,
    OwlModule
  ],
  declarations: [MyscrimmageComponent]
})
export class MyscrimmageModule { }
