import { NgModule , LOCALE_ID} from '@angular/core';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from '../components/user.component';
import { SettingsComponent } from '../components/settings/settings.component';

import { SharedModule } from '../../shared/modules/shared.module';

@NgModule({
  declarations: [
    UserComponent,
    SettingsComponent
  ],
  imports: [
    UserRoutingModule,
    SharedModule,
  ],
  providers: []
})
export class UserModule {}
