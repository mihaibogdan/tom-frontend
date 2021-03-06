import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

import { FadeInOrOut } from '../../shared/animations/animations';

import { AuthService } from '../../shared/services/auth.service';
import { UserService } from '../../shared/services/user.service';

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
  public isLoading = false;
  public errorMessage = '';

  constructor(private authService: AuthService, private userService: UserService, private router: Router) { }

  ngOnInit() {
  }

  public enterPassword = (form) => {
    if (!form.valid) return;
    this.isLoading = true;
    this.errorMessage = '';

    this.userService.checkUser(this.user.email)
      .then(() => {
        this.step = 'password';
        this.isLoading = false;

        setTimeout(() => {
          this.passwordInput.nativeElement.focus();
        })
      })
      .catch((err) => {
        this.isLoading = false;
        this.errorMessage = err.message;
      })
  };

  public enterUsername = () => {
    this.step = 'username';
    this.errorMessage = '';

    setTimeout(() => {
      this.emailInput.nativeElement.focus();
    })
  };

  public login = (form) => {
    if (!form.valid) return;
    this.isLoading = true;
    this.errorMessage = '';

    let subject = this.authService.login(this.user.email, this.user.password);

    subject.subscribe(
      (res) => {
        let data = this.jwtHelper.decodeToken(this.authService.getAccessToken());
        this.isLoading = false;
        if (data && data.role) {
          this.router.navigate([data.role]);
        }
      },
      (err) => {
        this.isLoading = false;
        this.errorMessage = err.error.message;
      }
    );
  }
}
