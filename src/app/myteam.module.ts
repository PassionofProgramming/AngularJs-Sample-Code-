import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
  import { Ng2DeviceDetectorModule } from 'ng2-device-detector';
import { MyTeamRoutingModule } from './myteam-routing.module';
import { OwlModule } from 'angular-owl-carousel';
import { MyteamComponent } from './myteam.component';

@NgModule({
  imports: [
    CommonModule,
    MyTeamRoutingModule,
     Ng2DeviceDetectorModule.forRoot(),
    OwlModule
  ],
  declarations: [MyteamComponent]
})
export class MyteamModule { }
