import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/components/login.component';
import { ForgotPasswordComponent } from './forgot-password/components/forgot-password.component';
import { SetPasswordComponent } from './set-password/components/set-password.component';

import { AuthGuard } from './shared/services/auth-guard.service';

const appRoutes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent,  canActivate: [AuthGuard]},
  { path: 'forgot-password', component: ForgotPasswordComponent, canActivate: [AuthGuard]},
  { path: 'register', loadChildren: './register/modules/register.module#RegisterModule', canActivate: [AuthGuard]},
  { path: 'set-password', loadChildren: './set-password/modules/set-password.module#SetPasswordModule', canActivate: [AuthGuard]},
  { path: 'admin', loadChildren: './admin/modules/admin.module#AdminModule', canActivate: [AuthGuard]},
  { path: 'user', loadChildren: './user/modules/user.module#UserModule', canActivate: [AuthGuard]},

  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
