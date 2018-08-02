import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { SetPasswordRoutingModule } from './set-password-routing.module';


import { SetPasswordComponent } from '../components/set-password.component';
import { SharedModule } from '../../shared/modules/shared.module';

@NgModule({
  declarations: [
    SetPasswordComponent
  ],
  imports: [
    SharedModule,
    SetPasswordRoutingModule
  ]
})
export class SetPasswordModule { }
