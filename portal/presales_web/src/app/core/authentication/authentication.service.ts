/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, map, switchMap, catchError } from 'rxjs/operators';
import { AuthService } from 'ngx-auth';

import { TokenStorage } from './token-storage.service';
import { environment } from 'environments/environment';

interface AccessData {
    access_token?: string;
    refresh_token?: string;
}

@Injectable()
export class AuthenticationService implements AuthService {

    private backendUrl: string;
    constructor(
        private http: HttpClient,
        private tokenStorage: TokenStorage
    ) {
        this.backendUrl = environment.backendUrl;
    }

    /**
     * Check, if user already authorized.
     * @description Should return Observable with true or false values
     * @returns {Observable<boolean>}
     * @memberOf AuthService
     */
    public isAuthorized(): Observable<boolean> {
        return this.tokenStorage
            .getAccessToken()
            .pipe(map(token => !!token));
    }

    /**
     * Get access token
     * @description Should return access token in Observable from e.g.
     * localStorage
     * @returns {Observable<string>}
     */
    public getAccessToken(): Observable<string> {
        return this.tokenStorage.getAccessToken();
    }

    /**
     * Function, that should perform refresh token verifyTokenRequest
     * @description Should be successfully completed so interceptor
     * can execute pending requests or retry original one
     * @returns {Observable<any>}
     */
    public refreshToken(): Observable<AccessData> {
        return this.tokenStorage
            .getRefreshToken()
            .pipe(
                tap(refToken => console.log(refToken)),
                switchMap((refreshToken: string) => {
                    return this.http.post(`${this.backendUrl}/oauth/token`,
                        {
                            'grant_type': 'refresh_token',
                            'refresh_token': refreshToken,
                            'client_id': environment.client_id,
                            'client_secret': environment.client_secret,
                            'scope': '*',
                            // 'provider': environment.provider
                        });
                }),
                tap((tokens: AccessData) => this.saveAccessData(tokens)),
                catchError((err) => {
                    this.logout();

                    return Observable.throw(err);
                })
            );

    }

    /**
     * Function, checks response of failed request to determine,
     * whether token be refreshed or not.
     * @description Essentialy checks status
     * @param {Response} response
     * @returns {boolean}
     */
    public refreshShouldHappen(response: HttpErrorResponse): boolean {
        return response.status === 401;
    }

    /**
     * Verify that outgoing request is refresh-token,
     * so interceptor won't intercept this request
     * @param {string} url
     * @returns {boolean}
     */
    public verifyTokenRequest(url: string): boolean {
        return url.endsWith('/oauth/token');
    }

    /**
     * EXTRA AUTH METHODS
     */

    public login({ email, password }): Observable<any> {
        return this.http.post(`${this.backendUrl}/oauth/token`,
            {
                'grant_type': 'password',
                'username': email,
                'password': password,
                'client_id': environment.client_id,
                'client_secret': environment.client_secret,
                'scope': '*',
            })
            .pipe(
                tap((tokens: AccessData) => this.saveAccessData(tokens))
            );
    }

    /**
     * Logout
     */
    public logout(): void {
        this.tokenStorage.clear();
        location.reload();
    }

    /**
     * Save access data in the storage
     *
     * @private
     * @param {AccessData} data
     */
    private saveAccessData({ access_token, refresh_token }: AccessData) {
        this.tokenStorage
            .setAccessToken(access_token)
            .setRefreshToken(refresh_token);
    }

}
