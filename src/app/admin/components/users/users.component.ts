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
  private name = '';

  private numberOfUsersPerPage = 4;
  private currentPage = 1;
  private numberOfUsers = 0;
  private numberOfPages = 0;

  public user = {};

  public selectedAll = false;
  constructor( private userService: UserService,
               private authService: AuthService,
               private router: Router) {
    this.subscription = this.usersSubject
      .pipe(debounceTime(200))
      .subscribe((name) => {
        this.name = name;
        this.selectedAll = false;
        this.getUsers();
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

  private getUsers = () => {
    let params = {
      name: this.name,
      limit: this.numberOfUsersPerPage,
      page: this.currentPage
    };
    this.userService.getUsers(params).then((res: any) => {
      this.users = _.map(res.docs, user => {
        user.privilege = PRIVILEGES[user.role];
        user.status = IS_ACTIVE[user.active];
        return user;
      });
      this.numberOfUsers = res.total;
      this.numberOfPages = res.pages;
      if (this.currentPage > this.numberOfPages) {
        this.currentPage = this.numberOfPages;
      }
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

  public toggleAll = () => {
    _.forEach(this.users, (user) => {
      user.selected = this.selectedAll;
    })
  };

  public toggleCheckbox = () => {
    let numberOfItemsSelected = _.filter(this.users, 'selected').length;

    this.selectedAll = numberOfItemsSelected ===  this.numberOfUsersPerPage;
  };

  public nextPage = () => {
    if (this.currentPage < this.numberOfPages) {
      this.currentPage++;
      this.selectedAll = false;
      this.getUsers();
    }
  };

  public previousPage = () => {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.selectedAll = false;
      this.getUsers();
    }
  };

  public logout = () => {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
