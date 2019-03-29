import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchscrimmagesComponent } from './searchscrimmages.component';

const routes: Routes = [
    {
        path: '', component: SearchscrimmagesComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SearchScrimmageRoutingModule {
}
