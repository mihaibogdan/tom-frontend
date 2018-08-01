import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { Subject, Observable } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { UserService } from '../../../shared/services/user.service';
import { AuthService } from '../../../shared/services/auth.service';
import { PRIVILEGES, IS_ACTIVE } from '../../../shared/utils/constants';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.less']
})
export class UsersComponent implements OnInit {
  private users = [];
  private subscription;
  private usersSubject = new Subject<string>();

  private numberOfUsersPerPage = 25;
  private usersPerPage = [];
  private currentPage = 0;

  public user = {};

  public selectedAll = false;
  constructor( private userService: UserService,
               private authService: AuthService,
               private router: Router) {
    this.subscription = this.usersSubject
      .pipe(debounceTime(200))
      .subscribe((name) => {
        this.getUsers({ name });
      });
  }

  ngOnInit() {
    this.getUsers();
    this.getCurrentUser();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private getCurrentUser = () => {
    this.userService.getProfile().then((res) => {
      this.user = res;
    })
  };

  private getUsers = (params = {}) => {
    this.userService.getUsers(params).then((res: any) => {
      this.users = _.map(res, user => {
        user.privilege = PRIVILEGES[user.role];
        user.status = IS_ACTIVE[user.active];
        return user;
      });
      this.usersPerPage = _.chunk(this.users, this.numberOfUsersPerPage);
    })
  };

  private updateUsers = (prop) => {
    let usersToUpdate = _.filter(this.usersPerPage[this.currentPage], 'selected');

    _.each(usersToUpdate, (user) => {
      this.userService.updateUser(user.id, prop).then((res: any) => {
        user = _.find(this.usersPerPage[this.currentPage], {id: user.id});
        user.privilege = PRIVILEGES[res.role];
        user.status = IS_ACTIVE[res.active];
      })
    });
  };

  public toggleAll = () => {
    _.forEach(this.usersPerPage[this.currentPage], (user) => {
      user.selected = !user.selected;
    })
  };

  public toggleCheckbox = () => {
    let numberOfItemsSelected = _.filter(this.usersPerPage[this.currentPage], 'selected').length;

    this.selectedAll = numberOfItemsSelected ===  this.usersPerPage[this.currentPage].length;
  };

  public nextPage = () => {
    if (this.currentPage < this.usersPerPage.length - 1) {
      this.currentPage++;
      this.selectedAll = false;
      this.toggleCheckbox();
    }
  };

  public previousPage = () => {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.toggleCheckbox();
    }
  };

  public logout = () => {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
