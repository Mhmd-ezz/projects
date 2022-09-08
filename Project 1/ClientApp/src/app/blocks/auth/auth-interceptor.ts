import {
    HttpInterceptor,
    HttpHandler,
    HttpRequest
} from '@angular/common/http';
import { Subject, Observable, empty, throwError, from } from 'rxjs';
import { Injector, Optional, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    refreshTokenInProgress = false;

    tokenRefreshedSource = new Subject();
    tokenRefreshed$ = this.tokenRefreshedSource.asObservable();
    authService;

    constructor(
        @Optional() private injector: Injector,
        private router: Router
    ) {
    }

    addAuthHeader(request): any {
        const authHeader = this.authService.getaccessToken();
        if (authHeader) {
            return request.clone({
                setHeaders: {
                    Authorization: 'Bearer ' + authHeader
                }
            });
        }
        return request;
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
        this.authService = this.injector.get(AuthService);
        const i = this.injector.get(AuthService);
        // request = this.addAuthHeader(request);       
        // Handle response
        return next.handle(request).pipe(
            map(response => {

                const message = response && response['body'] && response['body']['errors'] && response['body']['errors'][0] && response['body']['errors'][0]['message'] ? response['body']['errors'][0]['message'] : null;

                if (message && message.indexOf('Authorization') !== -1) {
                    let idTokenExpired = false;
                    let tokenExpired = false;
                    const authData = this.authService.isStatelessSession();
                    if (authData) {
                        idTokenExpired =
                            new Date() >
                            new Date(this.authService.getIdTokenExpiration());
                        tokenExpired =
                            new Date() >
                            new Date(
                                this.authService.getAccessTokenExpiration()
                            );

                        console.log('Token Expired ... logging out ');

                        // @ Check if idToken is not expired and token is expired
                        // @ then try to refresh token
                        if (!idTokenExpired && tokenExpired) {
                            this.authService
                                .refreshToken()
                                .then(_ => {
                                    next.handle(request);
                                })
                                .catch(_ => {
                                    // @ token not refreshed
                                    this.authService.logout();
                                    return throwError(request);
                                });
                        } else {
                            // @ token not expired and idToken not expired, Unauthorized action?
                            this.authService.logout();
                            return throwError(request);
                        }
                    } else {
                        // @ Session is statless
                        this.router.navigateByUrl('/login');
                        return throwError(request);
                    }
                }

                return response;
            }),
            catchError(error => {
                // @ While graphql always returns 200 status catchError will not be triggered anytime so we used map() instead
                // @ Check for 401
                if (error.status === 401) {
                    let idTokenExpired = false;
                    let tokenExpired = false;
                    const authData = this.authService.isStatelessSession();
                    if (authData) {
                        idTokenExpired =
                            new Date() >
                            new Date(this.authService.getIdTokenExpiration());
                        tokenExpired =
                            new Date() >
                            new Date(
                                this.authService.getAccessTokenExpiration()
                            );
                        console.log('Token Expired ... logging out ');

                        // @ Check if idToken is not expired and token is expired
                        // @ then try to refresh token
                        if (!idTokenExpired && tokenExpired) {
                            this.authService
                                .refreshToken()
                                .then(_ => {
                                    next.handle(request);
                                })
                                .catch(_ => {
                                    // @ token not refreshed
                                    this.authService.logout();
                                    return throwError(request);
                                });
                        } else {
                            // @ token not expired and idToken not expired, Unauthorized action?
                            this.authService.logout();
                            return throwError(request);
                        }
                    } else {
                        // @ Session is statless
                        this.router.navigateByUrl('/login');
                        return throwError(request);
                    }
                } else if (error.status === 403) {
                    const hasValidToken = this.authService.hasValidToken();
                    if (hasValidToken) {
                        // @ We have a valid token, just redirect to lock screen
                        this.router.navigateByUrl('/login');
                    } else {
                        this.authService.logout();
                        return throwError(request);
                    }
                } else {
                    // @ Not 401 or 403, then return the request
                    if (error.error) {
                        return throwError(error.error);
                    } else if (error.message) {
                        return throwError(error.message);
                    }
                }
                return throwError(error);
            })
        );
    }
}
