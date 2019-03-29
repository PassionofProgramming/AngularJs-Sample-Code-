import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchScrimmageRoutingModule } from './searchscrimmages-routing.module';
import { OwlModule } from 'angular-owl-carousel';
import { SearchscrimmagesComponent } from './searchscrimmages.component';

@NgModule({
  imports: [
    CommonModule,
    SearchScrimmageRoutingModule,
    OwlModule
  ],
  declarations: [SearchscrimmagesComponent]
})
export class SearchScrimmageModule { }
