import { NgModule, LOCALE_ID } from '@angular/core';

import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { EqualValidator } from '../../shared/validators/validateEqual';

@NgModule({
  declarations: [
    EqualValidator
  ],
  imports: [
    RouterModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
  ],
  exports: [
    RouterModule,
    CommonModule,
    FormsModule,
    EqualValidator
  ]
})
export class SharedModule {}
