import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { RegisterRoutingModule } from './register-routing.module'


import { RegisterComponent } from '../components/register.component';
import { SharedModule } from '../../shared/modules/shared.module';

@NgModule({
  declarations: [
    RegisterComponent
  ],
  imports: [
    SharedModule,
    RegisterRoutingModule
  ]
})
export class RegisterModule { }
