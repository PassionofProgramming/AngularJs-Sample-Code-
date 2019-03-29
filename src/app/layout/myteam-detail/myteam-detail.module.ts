import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { MultipleDatePicker } from 'multiple-date-picker/index';
import { MyteamDetailRoutingModule } from './myteam-detail-routing.module';
import { OwlModule } from 'angular-owl-carousel';
import { MyteamDetailComponent } from './myteam-detail.component';
  import { Ng2DeviceDetectorModule } from 'ng2-device-detector';
// import { AgmCoreModule } from '@agm/core';

@NgModule({
  imports: [
    CommonModule,
    MyteamDetailRoutingModule,
    OwlModule,
     Ng2DeviceDetectorModule.forRoot(),
    // MultipleDatePicker,
    // AgmCoreModule.forRoot({
    //   apiKey: 'AIzaSyAWb2DB1UJYjUTR4LGEvWK8L_xXq9dxQ8M'
    // })
  ],
  declarations: [MyteamDetailComponent]
})
export class MyteamDetailModule { }
