import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', redirectTo: 'dashboard' },
            { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule' },
            { path: 'users', loadChildren: './charts/charts.module#ChartsModule' },
            { path: 'datamanage', loadChildren: './datamanage/datamanage.module#DataManageModule' },
            { path: 'report', loadChildren: './tables/tables.module#TablesModule' },
            { path: 'payment', loadChildren: './form/form.module#FormModule' },
            { path: 'abuse', loadChildren: './bs-element/bs-element.module#BsElementModule' },
            { path: 'membership', loadChildren: './grid/grid.module#GridModule' },
            { path: 'privacy', loadChildren: './privacy/privacy.module#PrivacyModule' },
            { path: 'components', loadChildren: './bs-component/bs-component.module#BsComponentModule' },
            { path: 'userdetail/:id', loadChildren: './blank-page/blank-page.module#BlankPageModule' }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule {}
