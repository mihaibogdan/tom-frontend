import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

import { FadeInOrOut } from '../../shared/animations/animations';

import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
  animations: [FadeInOrOut]
})
export class LoginComponent implements OnInit {
  @ViewChild('passwordInput') passwordInput:ElementRef;
  @ViewChild('emailInput') emailInput:ElementRef;

  private jwtHelper = new JwtHelperService();
  public step = 'username';
  public user = {
    email: '',
    password: ''
  };

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  public enterPassword = (form) => {
    if (!form.valid) return;

    this.step = 'password';

    setTimeout(() => {
      this.passwordInput.nativeElement.focus();
    })
  };

  public enterUsername = () => {
    this.step = 'username';

    setTimeout(() => {
      this.emailInput.nativeElement.focus();
    })
  };

  public login = (form) => {
    if (!form.valid) return;

    let subject = this.authService.login(this.user.email, this.user.password);

    subject.subscribe(
      (res) => {
        let data = this.jwtHelper.decodeToken(this.authService.getAccessToken());

        if (data && data.role) {
          this.router.navigate([data.role]);
        }
      },
      (err) => {

      }
    );
  }
}
