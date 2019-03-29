import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { ChartsModule as Ng2Charts } from 'ng2-charts';
// import { DataTablesModule } from 'angular-datatables';
import { ChartsRoutingModule } from './charts-routing.module';
import { ChartsComponent } from './charts.component';
// import { PageHeaderModule } from '../../../shared';

@NgModule({
    imports: [CommonModule, ChartsRoutingModule],
    declarations: [ChartsComponent]
})
export class ChartsModule {}
