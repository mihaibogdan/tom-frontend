import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FadeInOrOut } from '../../../shared/animations/animations';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
  animations: [FadeInOrOut]
})
export class LoginComponent implements OnInit {
  @ViewChild('passwordInput') passwordInput:ElementRef;
  @ViewChild('emailInput') emailInput:ElementRef;

  public step = 'username';
  public user = {
    email: '',
    password: ''
  };

  constructor() { }

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

    console.log('login');
  }
}
