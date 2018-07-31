import { Component, OnInit } from '@angular/core';

import { FadeInOrOut } from '../../shared/animations/animations';

import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.less'],
  animations: [FadeInOrOut]
})
export class ForgotPasswordComponent implements OnInit {
  public showForm = true;
  public userEmail = '';

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  public resetPassword = (form) => {
    if (!form.valid) return;

    this.authService.resetPassword(form.value.email)
      .then(() => {})
      .catch((err) => {});
  }
}
