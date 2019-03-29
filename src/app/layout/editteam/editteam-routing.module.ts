import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditteamComponent } from './editteam.component';

const routes: Routes = [
    {
        path: '', component: EditteamComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class EditteamRoutingModule {
}
