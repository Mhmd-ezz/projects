import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'environments/environment';
import { AuthService } from 'app/blocks/auth/auth.service';
import { IUsersResult, User } from 'app/blocks/interface/user.model';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../store/reducers';
import { Tenant } from '../common/tenant.model';
import { switchMap } from 'rxjs/operators';

@Injectable()
export class UserService {
    private baseUrl: string;
    private tenantsBaseUrl: string;
    private currentTenant$: Observable<Tenant>;

    constructor(
        private _authService: AuthService,
        private _httpClient: HttpClient,
        private _store: Store<fromRoot.AppState>
    ) {
        this.baseUrl = environment.backEnd;
        this.tenantsBaseUrl = this.baseUrl + '/api/tenants';
        this.currentTenant$ = this._store.select(fromRoot.getCurrentTenant);
    }

    getUserName(): string {
        return this._authService.identityClaims
            ? this._authService.identityClaims['name']
            : '';
    }

    getUsers(
        text: string,
        page: number,
        limit: number
    ): Observable<IUsersResult> {
        return this.currentTenant$.pipe(
            switchMap(tenant => {
                const requestUrl = `${this.tenantsBaseUrl +
                    '/' +
                    tenant.id +
                    '/users'}?text=${text}&page=${page}&limit=${limit}`;
                const result = this._httpClient.get<IUsersResult>(requestUrl);
                return result;
            })
        );
    }

    createUser(user: User): Observable<User> {
        return this.currentTenant$.pipe(
            switchMap(tenant => {
                user.tenantId = tenant.id;
                return this._httpClient.post<User>(
                    this.tenantsBaseUrl + '/' + tenant.id + '/users',
                    user
                );
            })
        );
    }

    updateUser(user: User): any {
        return this.currentTenant$.pipe(
            switchMap(tenant => {
                return this._httpClient.put<User>(
                    this.tenantsBaseUrl + '/' + tenant.id + '/users/' + user.id,
                    user
                );
            })
        );
    }

    getUser(id): Observable<User> {
        return this.currentTenant$.pipe(
            switchMap(tenant => {
                return this._httpClient.get<User>(
                    this.tenantsBaseUrl + '/' + tenant.id + '/users/' + id
                );
            })
        );
    }

    resetUserPassword(user: User): Observable<any> {
        return this.currentTenant$.pipe(
            switchMap(tenant => {
                return this._httpClient.post<User>(
                    this.tenantsBaseUrl +
                        '/' +
                        tenant.id +
                        '/users/' +
                        user.id +
                        '/reset',
                    null
                );
            })
        );
    }

    resendEmail(user: User): Observable<any> {
        return this.currentTenant$.pipe(
            switchMap(tenant => {
                return this._httpClient.post<User>(
                    this.tenantsBaseUrl +
                        '/' +
                        tenant.id +
                        '/users/' +
                        user.id +
                        '/resendEmail',
                    null
                );
            })
        );
    }
    
    removeUser(id): Observable<User> {
        return this.currentTenant$.pipe(
            switchMap(tenant => {
                return this._httpClient.delete<User>(
                    this.tenantsBaseUrl + '/' + tenant.id + '/users/' + id
                );
            })
        );
    }
}
