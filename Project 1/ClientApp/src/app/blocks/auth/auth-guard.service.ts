import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router, NavigationEnd } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  currentUrl: any;
  previousUrl: any;
  constructor(
    private authService: AuthService,
    private _router: Router,
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean> {
    return this.authService.canActivateProtectedRoutes$
      .pipe(
        // tap(x => console.log('You tried to go to ' + state.url + ' and this guard said ' + x)),
        tap(canActivate => {
          // @ Not authenticated, then redirect to login and save state in storage
          if (!canActivate) {
            localStorage.setItem("previousUrl", state.url)
            this._router.navigateByUrl('/login')
          }
        })
      );
  }
}
