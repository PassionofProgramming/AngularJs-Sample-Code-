import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { OwlModule } from 'angular-owl-carousel';
import { UICarouselModule } from "ui-carousel";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {NgAutoCompleteModule} from "ng-auto-complete";
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    OwlModule,
    FormsModule, 
    ReactiveFormsModule,
    LoadingBarRouterModule,
    NgAutoCompleteModule,
    UICarouselModule,
    Ng2SearchPipeModule,
    MatAutocompleteModule,
    // OwlModule,
    // AgmCoreModule.forRoot({
    //    apiKey: "AIzaSyAWb2DB1UJYjUTR4LGEvWK8L_xXq9dxQ8M",
    //   libraries: ["places"]
    // })
    //  AgmCoreModule.forRoot({
    //   apiKey: 'AIzaSyAWb2DB1UJYjUTR4LGEvWK8L_xXq9dxQ8M'
    // })
  ],
  declarations: [HomeComponent]
})
export class HomeModule { }
