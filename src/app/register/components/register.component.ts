import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

import { User } from '../../shared/models/user.model';
import { FadeInOrOut } from '../../shared/animations/animations';

import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.less'],
  animations: [FadeInOrOut]
})
export class RegisterComponent implements OnInit {
  private jwtHelper = new JwtHelperService();
  public user: User = {};
  public showForm = true;
  private errors = {}

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  public register = (form) => {
    if (!form.valid) return ;

    this.authService.register(form.value)
      .then(() => {
        let data = this.jwtHelper.decodeToken(this.authService.getAccessToken());

        if (data && data.role) {
          this.router.navigate([data.role]);
        }
      })
      .catch(err => {
        this.errors = err.errors;
      });
  }
}
