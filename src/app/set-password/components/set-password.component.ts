import { Component, OnInit } from '@angular/core';

import { FadeInOrOut } from '../../shared/animations/animations';

import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-set-password',
  templateUrl: './set-password.component.html',
  styleUrls: ['./set-password.component.less'],
  animations: [FadeInOrOut]
})
export class SetPasswordComponent implements OnInit {
  public showForm = true;
  public errorMessage;
  public isLoading = false;
  public user = {};
  public errors = {};

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  public setPassword = (form) => {
    if (!form.valid) return;
    this.errorMessage = '';
    this.isLoading = true;

    //this.authService.setPassword(form.value.password)
    //  .then(() => {
    //    this.isLoading = false;
    //  })
    //  .catch((err: any) => {
    //    this.errorMessage = err.message;
    //    this.isLoading = false;
    //  });
  }
}
