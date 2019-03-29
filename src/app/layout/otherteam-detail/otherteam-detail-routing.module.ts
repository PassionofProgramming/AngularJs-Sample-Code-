import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OtherteamDetailComponent } from './otherteam-detail.component';

const routes: Routes = [
    {
        path: '', component: OtherteamDetailComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class OtherteamDetailRoutingModule {
}
