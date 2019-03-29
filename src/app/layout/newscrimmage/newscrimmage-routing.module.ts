import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewscrimmageComponent } from './newscrimmage.component';

const routes: Routes = [
    {
        path: '', component: NewscrimmageComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class NewscrimmageRoutingModule {
}
