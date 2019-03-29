import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MessagelistRoutingModule } from './messagelist-routing.module';
import { OwlModule } from 'angular-owl-carousel';
import { MessagelistComponent } from './messagelist.component';

@NgModule({
  imports: [
    CommonModule,
    MessagelistRoutingModule,
    OwlModule
  ],
  declarations: [MessagelistComponent]
})
export class MessagelistModule { }
