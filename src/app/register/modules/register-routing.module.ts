import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegisterComponent } from '../components/register.component';

const registerRoutes: Routes = [
  { path: '', component: RegisterComponent },
];

@NgModule({
  imports: [RouterModule.forChild(registerRoutes)],
  exports: [RouterModule],
  declarations: [],
  providers: []
})
export class RegisterRoutingModule { }
