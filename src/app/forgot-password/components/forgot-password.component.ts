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
  public errorMessage;
  public isLoading = false;
  public success = false;

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  public resetPassword = (form) => {
    if (!form.valid) return;
    this.errorMessage = '';
    this.isLoading = true;

    this.authService.resetPassword(form.value.email)
      .then(() => {
        this.isLoading = false;
        this.success = true;
      })
      .catch((err: any) => {
        this.errorMessage = err.message;
        this.isLoading = false;
      });
  }
}
