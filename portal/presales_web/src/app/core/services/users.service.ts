/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable no-trailing-spaces */
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IPaginateInfo } from '../interface/IpaginatedInfo.interface';
import { User } from '../user/user.types';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private backendUrl: string = environment.backendUrl;

  constructor(
    private httpClient: HttpClient
  ) { }

  getUsers(
    page: number,
    limit?: number,
    filter?: string,
    sortBy?: string,
    descending: string | boolean = false,
    branchId: string[] = null,
    roles: string[] = null,
  ): Observable<IPaginateInfo<User>> {

    if (typeof descending == 'string' || !descending) {
      descending = descending === 'desc' ? true : false;
    }

    return this.httpClient.get<IPaginateInfo<User>>(`${this.backendUrl}/api/users`, {

      // @ http params doesn't accept boolean
      // @ server should parse 
      params: new HttpParams()
        .set('page', page.toString())
        .set('limit', limit.toString())
        .set('filter', filter)
        .set('sortBy', sortBy)
        .set('descending', descending.toString())
        .set('branch_id', branchId ? branchId.join(',') : '')
        .set('roles', roles ? roles.join(',') : '')

    });
  }

  createUser(user: User) {
    return this.httpClient.post<User>(`${this.backendUrl}/api/users`, user)
      .pipe(map((data: any) => data.data));
  }

  updateUser(user: User) {
    return this.httpClient.put<User>(`${this.backendUrl}/api/users/${user.id}`, user)
      .pipe(map((data: any) => data.data));
  }

  updateUserPassword(user: User) {
    return this.httpClient.put<User>(`${this.backendUrl}/api/users/update_password/${user.id}`, user)
      .pipe(map((data: any) => data.data));
  }

  getUserById(id) {
    return this.httpClient.get<User>(`${this.backendUrl}/api/users/${id}`);
      // .pipe(map((data: any) => data.data));
  }

  deleteUser(id) {
    return this.httpClient.delete(`${this.backendUrl}/api/users/${id}`);
  }
}
