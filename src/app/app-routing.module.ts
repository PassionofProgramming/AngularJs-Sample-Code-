import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthGuard } from './shared';

const routes: Routes = [
     { path: '', redirectTo: 'home', pathMatch: 'full' },
     { path: 'home', loadChildren: './home/home.module#HomeModule'},
    { path: '', loadChildren: './layout/layout.module#LayoutModule'},
    { path: 'admin', loadChildren: './admin/admin.module#AdminModule' },
    { path: 'login', loadChildren: './login/login.module#LoginModule' },
    { path: 'signup', loadChildren: './signup/signup.module#SignupModule' },
    { path: 'forgotPassword', loadChildren: './forgot-password/forgot-password.module#ForgotPasswordModule' },
    // { path: 'access-denied', loadChildren: './access-denied/access-denied.module#AccessDeniedModule' },
    // { path: 'not-found', loadChildren: './not-found/not-found.module#NotFoundModule' },
    { path: '**', redirectTo: 'not-found' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
