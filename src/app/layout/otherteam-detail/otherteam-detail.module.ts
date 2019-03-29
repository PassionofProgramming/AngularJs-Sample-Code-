import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OtherteamDetailRoutingModule } from './otherteam-detail-routing.module';
import { OwlModule } from 'angular-owl-carousel';
import { OtherteamDetailComponent } from './otherteam-detail.component';

@NgModule({
  imports: [
    CommonModule,
    OwlDateTimeModule, 
    OwlNativeDateTimeModule,
    OtherteamDetailRoutingModule,
    FormsModule, 
    ReactiveFormsModule,
    OwlModule
  ],
  declarations: [OtherteamDetailComponent]
})
export class OtherteamModule { }
