import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminComponent } from '../components/admin.component';
import { UsersComponent } from '../components/users/users.component';

const adminRoutes: Routes = [
  { path: '', component: AdminComponent, children: [
    { path: 'users', component: UsersComponent },

    { path: '**', redirectTo: 'users' }

  ]},
];

@NgModule({
  imports: [RouterModule.forChild(adminRoutes)],
  exports: [RouterModule],
  declarations: [],
  providers: []
})
export class AdminRoutingModule { }
