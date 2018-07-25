import { Component, OnInit } from '@angular/core';

import { User } from '../../../shared/models/user.model';
import { FadeInOrOut } from '../../../shared/animations/animations';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.less'],
  animations: [FadeInOrOut]
})
export class RegisterComponent implements OnInit {
  public user: User = {};
  public showForm = true;

  constructor() { }

  ngOnInit() {
  }

  public register = (form) => {
   if (!form.valid) return ;
  }
}
