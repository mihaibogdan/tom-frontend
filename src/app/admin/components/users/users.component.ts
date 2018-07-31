import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { Subject, Observable } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { UserService } from '../../../shared/services/user.service';
import { PRIVILEGES, IS_ACTIVE } from '../../../shared/utils/constants';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.less']
})
export class UsersComponent implements OnInit {
  private users;
  private subscription;
  private usersSubject = new Subject<string>();

  constructor(private userService: UserService) {
    this.subscription = this.usersSubject
      .pipe(debounceTime(200))
      .subscribe((name) => {
        this.getUsers({ name });
      });
  }

  ngOnInit() {
    this.getUsers();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private getUsers = (params = {}) => {
    this.userService.getUsers(params).then((res: any) => {
      this.users = _.map(res, user => {
        user.privilege = PRIVILEGES[user.role];
        user.status = IS_ACTIVE[user.active];
        return user;
      });
    })
  };

  private updateUsers = (prop) => {
    let usersToUpdate = _.filter(this.users, 'selected');

    _.each(usersToUpdate, (user) => {
      this.userService.updateUser(user.id, prop).then((res: any) => {
        user = _.find(this.users, {id: user.id});
        user.privilege = PRIVILEGES[res.role];
        user.status = IS_ACTIVE[res.active];
      })
    });
  };

}
