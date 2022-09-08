import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { updateGrantorGqlCallback } from 'app/blocks/graphql/callback/updateGrantorGqlCallback';
import { AppUtils } from 'app/blocks/utils';
import { empty, Subject } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, switchMap, takeUntil, tap, filter } from 'rxjs/operators';
import { GrantorBase } from '../../../blocks/graphql/generated/bases';
import { createGrantorGqlCallback } from './../../../blocks/graphql/callback/createGrantorGqlCallback';
import { CreateGrantorGQL, GrantorInput, UpdateGrantorGQL } from './../../../blocks/graphql/generated/gqlServices';
import { FormStatusEnum } from 'app/blocks/components/mdc-form-status/form-status.enum';


@Component({
    selector: 'new-grantor',
    templateUrl: './new-grantor.component.html',
    styleUrls: ['./new-grantor.component.scss']
})
export class NewGrantorComponent implements OnInit, OnDestroy {
    @ViewChild('form', { static: true}) public form: NgForm;

    // Private
    private _unsubscribeAll: Subject<any>;
    private savingDelay = 3000;

    public onGrantorChange: Subject<any>;
    public onGrantorProcessor: Subject<any>;
    public grantor: GrantorBase = new GrantorBase();
    public formStatus: string = null;
    public isDirty = false;
    public errors: any = [];
    public formStatusEnum: typeof FormStatusEnum = FormStatusEnum;


    constructor(
        private _createGrantorGQL: CreateGrantorGQL,
        private _updateGrantorGQL: UpdateGrantorGQL,
        private snackBar: MatSnackBar,
        private _router: Router,
        private dialog: MatDialog
    ) {
        // Set the private defaults
        this._unsubscribeAll = new Subject();
        this.onGrantorChange = new Subject();
        this.onGrantorProcessor = new Subject();
    }

    ngOnInit(): void {
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
                debounceTime(this.savingDelay)
            );
        this.onGrantorProcessor
            .pipe(takeUntil(this._unsubscribeAll))
            .pipe(
                distinctUntilChanged(),
                switchMap(x => {
                    if (this.grantor.id) {

                        this.onFormStatusChanged(this.formStatusEnum.saving);
                        let grantor_ = Object.assign({},this.grantor) as GrantorInput;

                        return this._updateGrantorGQL.mutate(
                            { grantor: grantor_ },
                            {
                                optimisticResponse: updateGrantorGqlCallback.optimisticResponse(
                                    this.grantor
                                ),
                                update: (proxy, ev) =>
                                    updateGrantorGqlCallback.update(
                                        proxy,
                                        ev
                                    )
                            }
                        );
                    } else {

                        this.onFormStatusChanged(this.formStatusEnum.saving);

                        this.grantor.id = AppUtils.GenerateObjectId();

                        let grantor_ = Object.assign({},this.grantor) as GrantorInput;

                        return this._createGrantorGQL.mutate(
                            { grantor: grantor_ },
                            {
                                optimisticResponse: createGrantorGqlCallback.optimisticResponse(this.grantor),
                                update: (proxy, ev) => createGrantorGqlCallback.update(proxy, ev)
                            }
                        );
                    }

                }),
                catchError((err, source) => {
                    this.onFormStatusChanged(this.formStatusEnum.error);
                    console.error('[ CATCH ERROR ]: ', err);
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
                response => {

                    this.onFormStatusChanged(this.formStatusEnum.saved);
                    if ('updateGrantor' in response.data && response.data.updateGrantor) {
                        this.errors = [];
                        AppUtils.SetFormPrestine(this.form);
                        this.isDirty = false;
                        const grantor = Object.assign({}, this.grantor);
                        this.grantor = AppUtils.mergeForForms(
                            grantor,
                            response.data.updateGrantor
                        );
                        this.snackBar.open('Grantor updated', 'CLOSE', {
                            panelClass: 'm-24',
                            duration: 2000
                        });
                    }
                    else if ('createGrantor' in response.data && response.data.createGrantor) {
                        this.errors = [];
                        AppUtils.SetFormPrestine(this.form);
                        this.isDirty = false;
                        const grantor = Object.assign({}, this.grantor);
                        this.grantor = AppUtils.mergeForForms(
                            grantor,
                            response.data.createGrantor
                        );
                        this.snackBar.open('Grantor created', 'CLOSE', {
                            panelClass: 'm-24',
                            duration: 2000
                        });
                    }
                },
                err => {
                    console.error(err);
                }
            );
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
}
