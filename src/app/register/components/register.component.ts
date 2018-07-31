import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

import { User } from '../../shared/models/user.model';
import { FadeInOrOut } from '../../shared/animations/animations';

import { AuthService } from '../../shared/services/auth.service';

import * as _ from 'lodash';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.less'],
  animations: [FadeInOrOut]
})
export class RegisterComponent implements OnInit {
  private jwtHelper = new JwtHelperService();
  public user:User = {};
  public showForm = true;
  private errors = {};
  public isLoading = false;

  constructor(private authService:AuthService, private router:Router) {
  }

  ngOnInit() {
  }

  public register = (form) => {
    if (!form.valid) return;

    this.isLoading = true;
    this.errors = {};

    this.authService.register(form.value)
      .then(() => {
        let data = this.jwtHelper.decodeToken(this.authService.getAccessToken());

        this.isLoading = false;
        if (data && data.role) {
          this.router.navigate([data.role]);
        }
      })
      .catch(err => {
        this.isLoading = false;

        this.errors = _.transform(err.errors, (result, err) => {
          result[err.field] = _.isArray(err.messages) ? err.messages[0] : err.messages;
        }, {});
      });
  }
}
