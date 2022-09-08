/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable()
export class TokenStorage {

  public getAccessToken(): Observable<string> {
    const token: string = <string>localStorage.getItem('accessToken');
    return of(token);
  }

  public getRefreshToken(): Observable<string> {
    const token: string = <string>localStorage.getItem('refreshToken');
    return of(token);
  }

  public setAccessToken(token: string): TokenStorage {
    localStorage.setItem('accessToken', token);
    return this;
  }

  public setRefreshToken(token: string): TokenStorage {
    localStorage.setItem('refreshToken', token);

    return this;
  }

  public clear() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }
}
