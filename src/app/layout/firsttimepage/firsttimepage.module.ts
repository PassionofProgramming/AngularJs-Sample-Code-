import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FirsttimeRoutingModule } from './firsttimepage-routing.module';
import { FirsttimepageComponent } from './firsttimepage.component';
import { OwlModule } from 'angular-owl-carousel';

@NgModule({
  imports: [
    CommonModule,
    FirsttimeRoutingModule,
    OwlModule
  ],
  declarations: [FirsttimepageComponent]
})
export class FirsttimeModule { }
