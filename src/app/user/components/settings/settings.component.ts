import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-user-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.less']
})
export class SettingsComponent implements OnInit {

  @ViewChild('nameInput') nameInput:ElementRef;
  @ViewChild('emailInput') emailInput:ElementRef;

  public inlineEditing = {};
  public user = {
    name: 'John Doe',
    email: 'johndoe@test.com'
  };

  constructor() { }

  ngOnInit() {
  }

  public toggleInline = (type) => {
    this.inlineEditing[type] = !this.inlineEditing[type];
  };

  public updateUser = (form, property) => {
    if (!form.valid) return;

    if (!this.inlineEditing[property) {
      this.toggleInline(property);
      this.focusOnInput(property);
    } else {
      //todo: API Call to update user
      this.toggleInline(property);
    }
  };

  public focusOnInput = (input) => {
    setTimeout(() => {
      this[`${input}Input`].nativeElement.focus();
    });
  }
}
