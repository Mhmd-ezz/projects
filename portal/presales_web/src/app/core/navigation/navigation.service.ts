/* eslint-disable prefer-const */
import { filter } from 'rxjs/operators';
/* eslint-disable @typescript-eslint/no-unused-expressions */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, ReplaySubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Navigation } from 'app/core/navigation/navigation.types';
import { UserService } from '../user/user.service';
import { FuseNavigationItem } from '@fuse/components/navigation';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class NavigationService {
    private _navigation: ReplaySubject<Navigation> = new ReplaySubject<Navigation>(1);

    /**
     * Constructor
     */
    constructor(
        private _httpClient: HttpClient,
        private _userService: UserService,
        private router: Router,

    ) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Getter for navigation
     */
    get navigation$(): Observable<Navigation> {
        return this._navigation.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get all navigation data
     */
    get(): Observable<Navigation> {
        return this._httpClient.get<Navigation>('api/common/navigation').pipe(
            tap((navigation: Navigation) => {
                this._userService.user$
                    .subscribe((user) => {
                        let filteredNavigation: Navigation = Object.assign({}, navigation);
                        const userRole = user.role_list && user.role_list[0] ? user.role_list[0] : null;


                        Object.keys(navigation).forEach((key, index) => {
                            filteredNavigation[key] = filteredNavigation[key].filter((navItem: FuseNavigationItem, i) => {
                                if (user.menu_permissions.indexOf(navItem.id) > -1) {
                                    return true;
                                } else {
                                    return false;
                                }
                            });
                        });


                        this._navigation.next(filteredNavigation);
                        // this.router.navigate(['/opportunities']);
                        // this._navigation.next(navigation);
                    });
            })
        );
    }
}
