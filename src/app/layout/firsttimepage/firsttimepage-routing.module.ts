import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FirsttimepageComponent } from './firsttimepage.component';

const routes: Routes = [
    {
        path: '', component: FirsttimepageComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FirsttimeRoutingModule {
}
