import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyscrimmageComponent } from './myscrimmage.component';

const routes: Routes = [
    {
        path: '', component: MyscrimmageComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MyscrimmageRoutingModule {
}
