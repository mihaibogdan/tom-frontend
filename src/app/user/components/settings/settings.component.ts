import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { UserService } from '../../../shared/services/user.service';
import { User } from '../../../shared/models/user.model';

@Component({
  selector: 'app-user-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.less']
})
export class SettingsComponent implements OnInit {

  @ViewChild('nameInput') nameInput:ElementRef;
  @ViewChild('emailInput') emailInput:ElementRef;

  public inlineEditing = {};
  public user: any = {};

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getProfile().then((user: any) => {
      this.user = user;
      this.user.name = `${user.firstName} ${user.lastName}`;
    });
  }

  public toggleInline = (type) => {
    this.inlineEditing[type] = !this.inlineEditing[type];
  };

  public updateUser = (form, property) => {
    if (!form.valid) return;

    if (!this.inlineEditing[property]) {
      this.toggleInline(property);
      this.focusOnInput(property);
    } else {
      let userData = {
        email: this.user.email,
        firstName: this.user.name.split(' ')[0] || '',
        lastName: this.user.name.split(' ')[1] || ''
      };
      this.userService.updateUser(this.user.id, userData).then((user: any) => {
        this.user = user;
        this.user.name = `${user.firstName} ${user.lastName}`;
        this.toggleInline(property);
      });
    }
  };

  public focusOnInput = (input) => {
    setTimeout(() => {
      this[`${input}Input`].nativeElement.focus();
    });
  }
}
