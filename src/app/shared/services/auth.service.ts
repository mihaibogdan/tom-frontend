import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, ReplaySubject } from 'rxjs';

import { User } from '../models/user.model';

import { environment } from '../../../environments/environment';

@Injectable()
export class AuthService {
  private jwtHelper = new JwtHelperService();

  constructor(private http: HttpClient) {
  }

  public register = (user: User) => {
    return new Promise((resolve, reject) => {
      this.http.post(`${environment.API_URL}/auth/register`, user)
        .subscribe(
          (res: any) => {
            this.setAccessToken(res.token.accessToken);
            this.setRefreshToken(res.token.refreshToken);
            resolve(res);
          },
          (err: any) => {
            reject(err.error);
          }
        );
    });
  };

  public login = (email: string, password: string): Observable<any> => {
    const postObservable = this.http.post(`${environment.API_URL}/auth/login`, {email, password});

    const subject = new ReplaySubject<any>(1);
    subject.subscribe((r: any) => {
      this.setAccessToken(r.token.accessToken);
      this.setRefreshToken(r.token.refreshToken);
      this.setUser(r.user);
    }, (err) => {
      this.handleAuthenticationError(err);
    });

    postObservable.subscribe(subject);
    return subject;
  };

  refresh = (): Observable<any> => {
    const email = this.getUser() ? this.getUser().email : null,
      refreshToken = this.getRefreshToken(),
      refreshObservable = this.http.post(`${environment.API_URL}/auth/refresh-token`, {email, refreshToken});

    const refreshSubject = new ReplaySubject<any>(1);
    refreshSubject.subscribe((r: any) => {
      this.setAccessToken(r.accessToken);
      this.setRefreshToken(r.refreshToken);
    }, (err) => {
      this.handleAuthenticationError(err);
    });

    refreshObservable.subscribe(refreshSubject);
    return refreshSubject;
  };

  public resetPassword = (email: string) => {
    return new Promise((resolve, reject) => {
      this.http.post(`${environment.API_URL}/auth/reset-password`, {email})
        .subscribe(
          (res: any) => {
            resolve(res);
          },
          (err: any) => {
            reject(err.error);
          }
        );
    });
  };

  public setPassword = (token: string, password: string) => {
    return new Promise((resolve, reject) => {
      this.http.put(`${environment.API_URL}/auth/set-password`, {token, password})
        .subscribe(
          (res: any) => {
            resolve(res);
          },
          (err: any) => {
            reject(err.error);
          }
        );
    });
  };

  public loggedIn = () => {
    let token = this.getAccessToken();
    return  token && !this.jwtHelper.isTokenExpired(token);
  };

  private handleAuthenticationError = (err: any) => {
    this.setAccessToken(null);
    this.setRefreshToken(null);
  };

  private setAccessToken = (accessToken: string) => {
    if (!accessToken) {
      localStorage.removeItem('access_token');
    } else {
      localStorage.setItem('access_token', accessToken);
    }
  };

  private setRefreshToken = (refreshToken: string) => {
    if (!refreshToken) {
      localStorage.removeItem('refresh_token');
    } else {
      localStorage.setItem('refresh_token', refreshToken);
    }
  };

  private setUser = (user: User) => {
    localStorage.setItem('user', JSON.stringify(user));
  };

  private getUser = () => {
    return JSON.parse(localStorage.getItem('user'));
  };

  getAccessToken = () => {
    return localStorage.getItem('access_token');
  };

  getRefreshToken = () => {
    return localStorage.getItem('refresh_token');
  };

  public logout = () => {
    this.setAccessToken(null);
    this.setRefreshToken(null);
  };
}
