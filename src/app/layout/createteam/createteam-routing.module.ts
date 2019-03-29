import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateteamComponent } from './createteam.component';

const routes: Routes = [
    {
        path: '', component: CreateteamComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CreateteamRoutingModule {
}
