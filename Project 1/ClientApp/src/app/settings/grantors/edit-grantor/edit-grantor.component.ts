
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';

import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

import { Logger } from '@nsalaun/ng-logger';
import { empty, Subject } from 'rxjs';
import { catchError, debounceTime, switchMap, takeUntil, tap, distinctUntilChanged, filter } from 'rxjs/operators';

import { ConfirmDialogComponent } from 'app/blocks/components/confirm-dialog/confirm-dialog-component';
import { updateGrantorGqlCallback } from 'app/blocks/graphql/callback/updateGrantorGqlCallback';
import { AppUtils } from 'app/blocks/utils';
import { GrantorGQL, UpdateGrantorGQL } from './../../../blocks/graphql/generated/gqlServices';
import { GrantorInputBase } from 'app/blocks/graphql/generated/bases';
import { FormStatusEnum } from 'app/blocks/components/mdc-form-status/form-status.enum';

@Component({
    selector: 'edit-grantor',
    templateUrl: './edit-grantor.component.html',
    styleUrls: ['./edit-grantor.component.scss']
})
export class EditGrantorComponent implements OnInit, OnDestroy {


    @ViewChild('form', { static: true}) public form: NgForm;

    // Private
    private _unsubscribeAll: Subject<any>;
    private savingDelay = 3000;

    public onGrantorChange: Subject<any>;
    public grantor: GrantorInputBase = new GrantorInputBase();
    public onGrantorProcessor: Subject<any>;
    public formStatus: string = null;
    public isDirty = false;
    public errors = [];
    public formStatusEnum: typeof FormStatusEnum = FormStatusEnum;

    constructor(
        private _updateGrantorGQL: UpdateGrantorGQL,
        private _grantorGQL: GrantorGQL,
        private snackBar: MatSnackBar,
        private _router: Router,
        private _route: ActivatedRoute,
        private dialog: MatDialog,
        private _logger: Logger,

    ) {
        // Set the private defaults
        this._unsubscribeAll = new Subject();
        this.onGrantorChange = new Subject();
        this.onGrantorProcessor = new Subject();
    }

    ngOnInit(): void {

        // @ Extract grantor id from route params and get grantor
        this._route.paramMap
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(params => {
                const id = params.get('id');
                if (id) {
                    this._grantorGQL
                        .watch({ id: id })
                        .valueChanges
                        .pipe(takeUntil(this._unsubscribeAll))
                        .subscribe(
                            (response) => {
                                if (response.data && response.data.grantor) {
                                    this.grantor = AppUtils.mergeForForms(this.grantor, response.data.grantor);
                                }
                            },
                            (error) => {
                                this.onFormStatusChanged('error');
                                this._logger.error(error);
                            });
                } else {
                    this.onFormStatusChanged(this.formStatusEnum.error);
                    this._logger.error('[Error]: Undefined route parameter -> location id ');
                }
            });

        // @ Subscribe for form changes
        this.form.valueChanges
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(data => {
                setTimeout(() => {
                    if (this.form.dirty) {
                        this.onGrantorChange.next(this.grantor);
                    }
                }, 0);

            });


        // @ SEND REQUEST 
        this.onGrantorChange
            .pipe(takeUntil(this._unsubscribeAll))
            .pipe(
                // @ validate the form and skip if invalid
                filter(() => {

                    const isValid = AppUtils.validateForm(this.form, false);

                    if (!isValid) {
                        this.onFormStatusChanged(this.formStatusEnum.invalid);
                    }

                    return isValid;
                }),
                tap(ev => {
                    this.onFormStatusChanged(this.formStatusEnum.pending);
                    this.isDirty = true;
                }),
                debounceTime(this.savingDelay),
            )
            .subscribe(
                x => this.onGrantorProcessor.next(x)
            );

        this.onGrantorProcessor
            .pipe(takeUntil(this._unsubscribeAll))
            .pipe(
                distinctUntilChanged(),
                switchMap(x => {

                    if (this.grantor.id) {

                        this.onFormStatusChanged(this.formStatusEnum.saving);

                        return this._updateGrantorGQL.mutate(
                            { grantor: this.grantor },
                            {
                                optimisticResponse: updateGrantorGqlCallback.optimisticResponse(this.grantor),
                                update: (proxy, ev) => updateGrantorGqlCallback.update(proxy, ev)
                            }
                        );

                    } else {
                        this.onFormStatusChanged(this.formStatusEnum.error);
                        console.error('[ERROR]: could not find grantor id.');
                    }

                }),
                catchError((err, source) => {
                    this.onFormStatusChanged(this.formStatusEnum.error);
                    console.log('[ CATCH ERROR ]: ', err);
                    this.snackBar.open('An error Occurred', 'CLOSE', {
                        panelClass: 'm-24',
                        duration: 4000,
                    });
                    // @ Important to return source to avoid observable completion
                    return source;
                })
            )
            .pipe(
                // @ Catch when saved locally
                filter((response) => {

                    if (response['dataPresent']) {
                        this.onFormStatusChanged(this.formStatusEnum.savedLocally);

                        this.snackBar.open('No internet access, Saved locally', 'CLOSE', {
                            panelClass: 'm-24',
                            duration: 4000,
                        });
                        return false;
                    }

                    return true;
                }),
                // @ Catch validation errors
                filter((response) => {

                    // @ errors exists
                    if (response.errors !== undefined && response.errors.length) {
                        this.errors = AppUtils.handleValidationGqlErrors(response.errors);
                    }

                    // @ found Validation errors
                    if (this.errors.length) {
                        this.onFormStatusChanged(this.formStatusEnum.validationError);

                        this.snackBar.open('An error Occurred', 'CLOSE', {
                            panelClass: 'm-24',
                            duration: 4000,
                        });
                    }
                    else if (response.errors) {
                        // @ Unknown error
                        this.onFormStatusChanged(this.formStatusEnum.error);
                         }

                    // @ if errors 
                    return response.errors !== undefined && response.errors.length ? false : true;
                })
            )
            .subscribe(
                (response) => {

                    this.onFormStatusChanged(this.formStatusEnum.saved);


                    if (response.data.updateGrantor) {
                        this.errors = [];
                        AppUtils.SetFormPrestine(this.form);
                        this.isDirty = false;
                        const grantor = Object.assign({}, this.grantor);
                        this.grantor = AppUtils.mergeForForms(grantor, response.data.updateGrantor);
                        this.snackBar.open('Grantor updated', 'CLOSE', {
                            panelClass: 'm-24',
                            duration: 2000,
                        });
                    }

                },
                (err) => {
                    console.error(err);
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

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    onDone(): void {

        this._router.navigate(['/settings/grantors']);

        // if (this.isDirty) {
        //     const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        //         minWidth: '350px',
        //         data: { isDirty: this.isDirty }
        //     });

        //     dialogRef.afterClosed().subscribe(result => {
        //         if (result) {
        //             this._router.navigate(['/settings/grantors']);
        //         }
        //     });
        // } else {
        //     this._router.navigate(['/settings/grantors']);
        // }
    }

    // @ Save Button  
    saveChanges(): void {
        if (AppUtils.validateForm(this.form, true)) {
            this.onGrantorProcessor.next(this.grantor);
        }
    }

    onFormStatusChanged(status: string): void {
        this.formStatus = status;
    }

    // onNewClick() {

    //     const dialogRef = this.dialog.open(ConfirmDialogComponent, {
    //         minWidth: '350px',
    //         data: { isDirty: this.isDirty, }
    //     });

    //     dialogRef.afterClosed().subscribe(result => {
    //         if (result) {
    //             this.grantor = new GrantorInputBase();
    //             this.form.reset(this.grantor);
    //             this.formStatus = "";
    //         }
    //     });
    // }
}
