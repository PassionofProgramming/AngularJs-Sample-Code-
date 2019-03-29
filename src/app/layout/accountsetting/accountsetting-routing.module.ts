import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountsettingComponent } from './accountsetting.component';

const routes: Routes = [
    {
        path: '', component: AccountsettingComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AccountsettingRoutingModule {
}
