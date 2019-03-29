import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyteamDetailComponent } from './myteam-detail.component';

const routes: Routes = [
    {
        path: '', component: MyteamDetailComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MyteamDetailRoutingModule {
}
