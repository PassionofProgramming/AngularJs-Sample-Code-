import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
  import { Ng2DeviceDetectorModule } from 'ng2-device-detector';
import { EditteamRoutingModule } from './editteam-routing.module';
import { OwlModule } from 'angular-owl-carousel';
import { EditteamComponent } from './editteam.component';
import { FileDropModule } from 'ngx-file-drop';
import { Ng2FileDropModule }  from 'ng2-file-drop';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { AgmCoreModule } from '@agm/core';
@NgModule({
  imports: [
    CommonModule,
    EditteamRoutingModule,
    OwlModule,
    Ng2FileDropModule,
    FileDropModule,
    Ng2DeviceDetectorModule.forRoot(),
    FormsModule, 
    ReactiveFormsModule,
    //   AgmCoreModule.forRoot({
    //    apiKey: "AIzaSyBOdFw0bwD2ITHQwIoyY7vkk-68slaH-rI",
    //   libraries: ["places"]
    // })
  ],
  declarations: [EditteamComponent]
})
export class EditteamModule { }
