import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { MyDatePickerModule } from 'mydatepicker';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { SearchresultRoutingModule } from './searchresult-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OwlModule } from 'angular-owl-carousel';
import { SearchresultComponent } from './searchresult.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { Angular5TimePickerModule } from 'angular5-time-picker';
import {
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatRippleModule
} from '@angular/material';
// import { AgmCoreModule } from '@agm/core';
@NgModule({
  imports: [
    CommonModule,
    SearchresultRoutingModule,
    OwlModule,
    OwlDateTimeModule,
    Angular5TimePickerModule,
    OwlNativeDateTimeModule,
    FormsModule, 
      MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatRippleModule,
    // Ng5TimePickerModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule,
    // MyDatePickerModule,
    // AgmCoreModule.forRoot({
    //   apiKey: 'AIzaSyAWb2DB1UJYjUTR4LGEvWK8L_xXq9dxQ8M'
    // }) 
  ],
  declarations: [SearchresultComponent]
})
export class SearchResultModule { }
