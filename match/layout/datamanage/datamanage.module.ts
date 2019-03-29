import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { DataTablesModule } from 'angular-datatables';
import { DataManageRoutingModule } from './datamanage-routing.module';
import { DatamanageComponent } from './datamanage.component';
// import { PageHeaderModule } from '../../../shared';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
    imports: [CommonModule,FormsModule, ReactiveFormsModule, DataManageRoutingModule,],
    declarations: [DatamanageComponent]
})
export class DataManageModule {}
