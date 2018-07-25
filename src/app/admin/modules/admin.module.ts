import { NgModule , LOCALE_ID} from '@angular/core';
import { AdminRoutingModule } from './admin-routing.module';

import { AdminComponent } from '../components/admin.component';
import { UsersComponent } from '../components/users/users.component';

import { SharedModule } from '../../shared/modules/shared.module';

@NgModule({
  declarations: [
    AdminComponent,
    UsersComponent
  ],
  imports: [
    AdminRoutingModule,
    SharedModule,
  ],
  providers: []
})
export class AdminModule {}
