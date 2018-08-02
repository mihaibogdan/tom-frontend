import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SetPasswordComponent } from '../components/set-password.component';

const setPasswordRoutes: Routes = [
  { path: '', component: SetPasswordComponent },
];

@NgModule({
  imports: [RouterModule.forChild(setPasswordRoutes)],
  exports: [RouterModule],
  declarations: [],
  providers: []
})
export class SetPasswordRoutingModule { }
