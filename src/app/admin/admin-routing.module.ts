import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
// import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
   path: '',
     component: AdminComponent,
     children: [
       { path: 'adminlogin', loadChildren: './login/adminlogin.module#LoginAdminModule' },
        { path: '', loadChildren: './layout/adminlayout.module#LayoutModule' },
   ]
}
 ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }


