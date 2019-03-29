import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewscrimmageRoutingModule } from './newscrimmage-routing.module';
import { OwlModule } from 'angular-owl-carousel';
import { NewscrimmageComponent } from './newscrimmage.component';

@NgModule({
  imports: [
    CommonModule,
    NewscrimmageRoutingModule,
    OwlModule
  ],
  declarations: [NewscrimmageComponent]
})
export class  NewscrimmageModule { }
