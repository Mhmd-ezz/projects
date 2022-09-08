import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router, NavigationEnd } from '@angular/router';
import { tap, map } from 'rxjs/operators';

import { AuthService } from './auth.service';
import { of } from 'rxjs';

@Injectable()
export class AuthPublicGuard implements CanActivate {

    constructor(
        private authService: AuthService,
        private _router: Router,
    ) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot,
    ) {

        return this.authService.canActivateProtectedRoutes$
            .pipe(
                // tap(x => console.log('You tried to go to public ' + state.url + ' and this guard said ' + x)),
                tap(canActivate => {
                    // @ Is authenticated ?
                    if (canActivate) {
                        let previousUrl = localStorage.getItem("previousUrl")
                        // @ Redirect to Url ?
                        if (previousUrl != '') {
                            // @ Clear storage
                            localStorage.setItem("previousUrl", "")
                            this._router.navigateByUrl(previousUrl)
                            return of(false)
                        }else{
                            // @ Authenticated but there is no redirect url
                            this._router.navigateByUrl('/')
                        }
                    }
                })
            )
            // @ Not authenticated then no redirect then user can access this page
            .pipe(map(canActivate => !canActivate))
    }
}
