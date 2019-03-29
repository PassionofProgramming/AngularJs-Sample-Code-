import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GridRoutingModule } from './grid-routing.module';
import { GridComponent } from './grid.component';
// import { PageHeaderModule } from './../../../shared';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [CommonModule, FormsModule, ReactiveFormsModule,MatAutocompleteModule, GridRoutingModule],
    declarations: [GridComponent]
})
export class GridModule {}
