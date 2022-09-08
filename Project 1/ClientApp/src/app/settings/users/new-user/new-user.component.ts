import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject, throwError } from 'rxjs';
import { takeUntil, catchError } from 'rxjs/operators';

import { AppUtils } from 'app/blocks/utils';
import { User } from '../../../blocks/interface/user.model';
import { UserService } from 'app/blocks/services/user.service';

@Component({
    selector: 'app-new-user',
    templateUrl: './new-user.component.html'
})
export class NewUserComponent implements OnInit, OnDestroy {
    // Private
    private _unsubscribeAll: Subject<any>;

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

    ngOnInit(): void {}

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    onSave(): void {
        // this.user.id = (Math.floor(Math.random() * 10000) + 1).toString();
        // @  fake json cannot push user to tenants. Then, push locally and update the whole tenant
        //        this.tenant.users.push(this.user);

        // console.log(this.form);

        const isValid = AppUtils.validateForm(this.form, true);
        if (isValid) {
            this._tenantsService
                .createUser(this.user)
                .pipe(takeUntil(this._unsubscribeAll) )
                .subscribe(
                    response => {
                        this.snackBar.open('User Created', 'CLOSE', {
                            panelClass: 'm-24',
                            duration: 4000
                        });
                        this._router.navigate(['../'], {
                            relativeTo: this._route
                        });
                    },
                    error => {
                        this.handleError(error);
                    }
                );
        }
    }

    handleError(error): void {
        // console.error(error);
        const message = error[''].join(', ');
        this.snackBar.open('Error ' + message, 'CLOSE', {
            panelClass: 'm-24'
            // duration: 4000,
        });
    }
    onBack(): void {
        this._router.navigate(['../'], { relativeTo: this._route });
    }
}
