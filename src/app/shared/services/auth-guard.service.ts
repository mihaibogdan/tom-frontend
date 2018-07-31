import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from './auth.service'

@Injectable()
export class AuthGuard implements CanActivate {
  private jwtHelper = new JwtHelperService();

  constructor(private router: Router,
              private auth: AuthService) {
  }

  private unAuthRoutes = ['login', 'register', 'forgot-password', 'set-password'];
  private roles = ['admin', 'user'];

  canActivate(route: ActivatedRouteSnapshot) : Promise<any> {
    return new Promise((resolve, reject) => {
      if (this.auth.loggedIn()) {
        resolve(this.processLoggedIn(route));
      } else {
        this.auth.refresh().subscribe(
          () => {
            if (this.auth.loggedIn()) {
              resolve(this.processLoggedIn(route));
            } else {
              resolve(this.processNotLoggedIn(route));
            }
          },
          (err) => {
            resolve(this.processNotLoggedIn(route));
          }
        );
      }
    });
  }

  private processLoggedIn = (route: ActivatedRouteSnapshot) => {
    let data = this.jwtHelper.decodeToken(this.auth.getAccessToken());

    if (this.roles.indexOf(data.role) === -1) {
      localStorage.removeItem('token');
      this.router.navigate(['/login']);

      return true;
    }

    if (this.unAuthRoutes.indexOf(route.url.toString()) !== -1) {
      this.router.navigate([`/${data.role}`]);
      return true;
    } else {
      if (data.role === route.url.toString()) {
        return true;
      } else {
        this.router.navigate([`/${data.role}`]);
        return true;
      }
    }
  };

  private processNotLoggedIn = (route: ActivatedRouteSnapshot) => {
    if (this.unAuthRoutes.indexOf(route.url.toString()) !== -1) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return true;
    }
  };

}
