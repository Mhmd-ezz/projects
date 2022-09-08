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
export class RolesService {
  private backendUrl: string = environment.backendUrl;

  constructor(
    private httpClient: HttpClient
  ) { }

  getRoles(
  ): Observable<IPaginateInfo<any>> {
    return this.httpClient.get<IPaginateInfo<any>>(`${this.backendUrl}/api/roles`);
  }

  // createUser(user: User) {
  //   return this.httpClient.post<User>(`${this.backendUrl}/api/users`, user)
  //     .pipe(map((data: any) => data.data));
  // }

  // updateUser(user: User) {
  //   return this.httpClient.put<User>(`${this.backendUrl}/api/users/${user.id}`, user)
  //     .pipe(map((data: any) => data.data));
  // }

  // getUserById(id) {
  //   return this.httpClient.get<User>(`${this.backendUrl}/api/users/${id}`)
  //     .pipe(map((data: any) => data.data));
  // }

  // deleteUser(id) {
  //   return this.httpClient.delete(`${this.backendUrl}/api/users/${id}`);
  // }
}
