import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DatamanageComponent } from './datamanage.component';

const routes: Routes = [
    {
        path: '',
        component: DatamanageComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DataManageRoutingModule {}
