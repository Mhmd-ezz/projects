import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject, throwError } from 'rxjs';
import { takeUntil, catchError, finalize } from 'rxjs/operators';

import { AppUtils } from 'app/blocks/utils';
import { User } from '../../../blocks/interface/user.model';
import { UserService } from 'app/blocks/services/user.service';

@Component({
    selector: 'app-edit-user',
    templateUrl: './edit-user.component.html'
})
export class EditUserComponent implements OnInit, OnDestroy {
    // Private
    private _unsubscribeAll: Subject<any>;
    private userId: string;

    @ViewChild('form', { static: true}) public form: NgForm;
    public user: User = new User();
    public formStatus = '';
    
    constructor(
        private _tenantsService: UserService,
        private _router: Router,
        private _route: ActivatedRoute,
        private snackBar: MatSnackBar
    ) {
        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    ngOnInit(): void {
        this._route.paramMap
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(params => {
                this.userId = params.get('id');
                // console.log('this.userId', this.userId);

                if (this.userId) {
                    this._tenantsService
                        .getUser(this.userId)
                        .pipe(takeUntil(this._unsubscribeAll))
                        .subscribe(
                            user => {
                                // console.log('user', user);
                                this.user = Object.assign(this.user, user);    
                    
                            },
                            err => this.handleError(err)
                        );
                } else {
                    console.error('[ERROR]:', 'undefiend user param id');
                }
            });
    }

    handleError(error): void {
        // console.error(error);
        const message = error[''].join(', ');
        this.snackBar.open('Error ' + message, 'CLOSE', {
            panelClass: 'm-24'
            // duration: 4000,
        });
    }
    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    onSave(): void {
       
        const isValid = AppUtils.validateForm(this.form, true);
        if (isValid) {
            this._tenantsService
            .updateUser(this.user)
            .pipe(
                takeUntil(this._unsubscribeAll),
                catchError(err => {
                    console.log('Handling error locally and rethrowing it...', err);
                    return throwError(err);
                }),
                // finalize(() => console.log('first finalize() block executed')),
                // catchError(err => { 
                //     console.error(err);
                //     return null;
                // }),
                // finalize(() => console.log('second finalize() block executed'))
                )
            .subscribe(response => {
                this.snackBar.open('User updated', 'CLOSE', {
                    panelClass: 'm-24',
                    duration: 4000
                });
                this._router.navigate(['../users'], { relativeTo: this._route.parent});
            },
            err => console.error(err)
            );
        } 
    }

    onBack(): void {
        this._router.navigate(['../users'], {relativeTo: this._route.parent});
    }

    matSelectCompare(objOne, objTwo): boolean {
        if (
            typeof objOne !== 'undefined' &&
            typeof objTwo !== 'undefined' &&
            objOne != null &&
            objTwo != null
        ) {
            return objOne.toString() === objTwo.toString();
        }
    }

    setEnabled (e): void {
        this.user.isEnabled = e.checked;
    }
}
