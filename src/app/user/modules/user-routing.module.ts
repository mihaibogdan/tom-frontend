import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserComponent } from '../components/user.component';
import { SettingsComponent } from '../components/settings/settings.component';

const userRoutes: Routes = [
  { path: '', component: UserComponent, children: [
    { path: 'settings', component: SettingsComponent },
    { path: '**', redirectTo: 'settings' }

  ]},
];

@NgModule({
  imports: [RouterModule.forChild(userRoutes)],
  exports: [RouterModule],
  declarations: [],
  providers: []
})
export class UserRoutingModule { }
