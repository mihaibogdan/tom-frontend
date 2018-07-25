import { Component, OnInit } from '@angular/core';

import { FadeInOrOut } from '../../shared/animations/animations';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.less'],
  animations: [FadeInOrOut]
})
export class ForgotPasswordComponent implements OnInit {
  public showForm = true;
  public userEmail = '';

  constructor() { }

  ngOnInit() {
  }

  public resetPassword = (form) => {
    if (!form.valid) return;
  }
}
