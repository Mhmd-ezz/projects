import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, ReplaySubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { User } from 'app/core/user/user.types';
import { environment } from 'environments/environment';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    backendUrl: string;

    private _user: ReplaySubject<User> = new ReplaySubject<User>(1);
    private userInfo: User = null;
    /**
     * Constructor
     */
    constructor(
        private _httpClient: HttpClient,
    ) {
        this.backendUrl = environment.backendUrl;

    }


    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Setter & getter for user
     *
     * @param value
     */
    set user(value: User) {
        // Store the value
        this._user.next(value);
    }


    get user$(): Observable<User> {
        return this._user.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get the current logged in user data
     */
    getLocal(): Observable<User> {
        return this._user.asObservable();
    }

    getLocalInfo(): Observable<User> {
        if(this.userInfo){
            return of(this.userInfo);
        }else{
            return this.get();
        }
    }

    /**
     * Get the current logged in user data
     */
    get(): Observable<User> {
        return this._httpClient.get<User>(`${this.backendUrl}/api/users/info`).pipe(
            tap((user) => {
                this.user = user;
                this.userInfo = user;
                this._user.next(user);
            })
        );
        // return this._httpClient.get<User>('api/common/user').pipe(
        //     tap((user) => {
        //         this._user.next(user);
        //     })
        // );
    }

    /**
     * Update the user
     *
     * @param user
     */
    update(user: User): Observable<any> {
        return this._httpClient.patch<User>('api/common/user', { user }).pipe(
            map((response) => {
                this._user.next(response);
            })
        );
    }
}
