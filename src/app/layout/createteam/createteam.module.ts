import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateteamRoutingModule } from './createteam-routing.module';
import { OwlModule } from 'angular-owl-carousel';
import { CreateteamComponent } from './createteam.component';
import { FileDropModule } from 'ngx-file-drop';
import { Ng2FileDropModule }  from 'ng2-file-drop';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
// import { AgmCoreModule } from '@agm/core';
@NgModule({
  imports: [
    CommonModule,
    CreateteamRoutingModule,
    OwlModule,
    Ng2FileDropModule,
    FileDropModule,
    FormsModule, 
    ReactiveFormsModule,
    NgxSpinnerModule,
    //   AgmCoreModule.forRoot({
    //    apiKey: "AIzaSyBOdFw0bwD2ITHQwIoyY7vkk-68slaH-rI",
    //   libraries: ["places"]
    // })
  ],
  declarations: [CreateteamComponent]
})
export class CreateteamModule { }
