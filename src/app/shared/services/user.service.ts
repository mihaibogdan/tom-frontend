import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';

@Injectable()
export class UserService {

  constructor(private http: HttpClient) {
  }

  public getProfile = () => {
    return new Promise((resolve, reject) => {
      this.http.get(`${environment.API_URL}/users/profile`)
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

  public updateUser = (userId: string, data) => {
    return new Promise((resolve, reject) => {
      this.http.patch(`${environment.API_URL}/users/${userId}`, data)
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

  public getUsers = (params = {}) => {
    return new Promise((resolve, reject) => {
      this.http.get(`${environment.API_URL}/users`, { params })
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
}
