import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxSpinnerModule } from 'ngx-spinner';
import { PrivacyRoutingModule } from './privacy-routing.module';
import { PrivacyComponent } from './privacy.component';
// import { PageHeaderModule } from './../../../shared';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
    CommonModule,
    NgxSpinnerModule, 
    FormsModule, 
    ReactiveFormsModule,
    MatAutocompleteModule, 
    PrivacyRoutingModule,],
    // PageHeaderModule],
    declarations: [PrivacyComponent],
})
export class PrivacyModule {}
