import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotificationRoutingModule } from './notification-routing.module';
import { OwlModule } from 'angular-owl-carousel';
import { NotificationComponent } from './notification.component';

@NgModule({
  imports: [
    CommonModule,
    NotificationRoutingModule,
    OwlModule
  ],
  declarations: [NotificationComponent]
})
export class NotificationModule { }
