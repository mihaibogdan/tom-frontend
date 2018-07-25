import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminComponent } from '../components/admin.component';
import { UsersComponent } from '../components/users/users.component';

const tutorRoutes: Routes = [
  { path: '', component: AdminComponent, children: [
    { path: 'users', component: UsersComponent }
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(tutorRoutes)],
  exports: [RouterModule],
  declarations: [],
  providers: []
})
export class AdminRoutingModule { }
