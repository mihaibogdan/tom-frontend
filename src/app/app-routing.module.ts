import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/components/login.component';
import { ForgotPasswordComponent } from './forgot-password/components/forgot-password.component';

const appRoutes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent},
  { path: 'forgot-password', component: ForgotPasswordComponent},
  { path: 'register', loadChildren: './register/modules/register.module#RegisterModule'},
  { path: 'admin', loadChildren: './admin/modules/admin.module#AdminModule'},

  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
