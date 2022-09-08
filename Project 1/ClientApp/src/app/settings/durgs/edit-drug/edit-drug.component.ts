import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Logger } from '@nsalaun/ng-logger';
import { updateDrugGqlCallback } from 'app/blocks/graphql/callback/updateDrugGqlCallback';
import { AppUtils } from 'app/blocks/utils';
import { Subject } from 'rxjs';
import {
    catchError,
    debounceTime,
    distinctUntilChanged,
    switchMap,
    takeUntil,
    tap,
    filter
} from 'rxjs/operators';

import { DrugBase } from '../../../blocks/graphql/generated/bases';
import {
    CreateDrugGQL,
    DrugGQL,
    DrugInput,
    UpdateDrugGQL
} from './../../../blocks/graphql/generated/gqlServices';
import { FormStatusEnum } from 'app/blocks/components/mdc-form-status/form-status.enum';

@Component({
    selector: 'edit-drug',
    templateUrl: './edit-drug.component.html',
    styleUrls: ['./edit-drug.component.scss']
})
export class EditDrugComponent implements OnInit, OnDestroy {
    @ViewChild('form', { static: true}) public form: NgForm;

    // Private
    private _unsubscribeAll: Subject<any>;
    private savingDelay = 10000;

    public onDrugChange: Subject<any>;
    public onDrugProcessor: Subject<any>;
    public drug: DrugBase = new DrugBase();
    public formStatus: string = null;
    public isDirty = false;
    public errors = [];
    public formStatusEnum: typeof FormStatusEnum = FormStatusEnum;

    constructor(
        private _createDrugGQL: CreateDrugGQL,
        private _updateDrugGQL: UpdateDrugGQL,
        private _drugGQL: DrugGQL,
        private snackBar: MatSnackBar,
        private _router: Router,
        private dialog: MatDialog,
        private _route: ActivatedRoute,

        private _logger: Logger
    ) {
        // Set the private defaults
        this._unsubscribeAll = new Subject();
        this.onDrugChange = new Subject();
        this.onDrugProcessor = new Subject();
    }

    ngOnInit(): void {
        // @ Extract location id from route params and get location
        this._route.paramMap
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(params => {
                const id = params.get('id');
                if (id) {
                    this._drugGQL
                        .watch({ id: id })
                        .valueChanges.pipe(takeUntil(this._unsubscribeAll))
                        .subscribe(
                            response => {
                                if (response.data && response.data.drug) {
                                    this.drug = AppUtils.mergeForForms(
                                        this.drug,
                                        response.data.drug
                                    );
                                }
                            },

                            error => {
                                this.onFormStatusChanged(
                                    this.formStatusEnum.error
                                );
                                this._logger.error(error);
                            }
                        );
                } else {
                    this.onFormStatusChanged(this.formStatusEnum.error);
                    this._logger.error(
                        '[Error]: Undefined route parameter -> drug id '
                    );
                }
            });

        // @ Subscribe for form changes
        this.form.valueChanges
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(data => {
                setTimeout(() => {
                    if (this.form.dirty) {
                        this.onDrugChange.next(this.drug);
                    }
                }, 0);
            });

        // @ SEND REQUEST
        this.onDrugChange
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
            )
            .subscribe(x => this.onDrugProcessor.next(x));

        this.onDrugProcessor
            .pipe(takeUntil(this._unsubscribeAll))
            .pipe(
                distinctUntilChanged(),

                switchMap(x => {
                    if (this.drug.id) {
                        this.onFormStatusChanged(this.formStatusEnum.saving);

                        let drug_ = Object.assign({},this.drug) as DrugInput;
                        return this._updateDrugGQL.mutate(
                            { drug: drug_ },
                            {
                                optimisticResponse: updateDrugGqlCallback.optimisticResponse(
                                    this.drug
                                ),
                                update: (proxy, ev) =>
                                    updateDrugGqlCallback.update(proxy, ev)
                            }
                        );
                    }
                }),
                catchError((err, source) => {
                    this.onFormStatusChanged(this.formStatusEnum.error);
                    console.error('[ CATCH ERROR ]: ', err);
                    this.snackBar.open('An error Occurred', 'CLOSE', {
                        panelClass: 'm-24',
                        duration: 4000
                    });
                    // @ Important to return source to avoid observable completion

                    return source;
                })
            )
            .pipe(
                // @ Catch when saved locally
                filter(response => {
                    if (response['dataPresent']) {
                        this.onFormStatusChanged(
                            this.formStatusEnum.savedLocally
                        );

                        this.snackBar.open(
                            'No internet access, Saved locally',
                            'CLOSE',
                            {
                                panelClass: 'm-24',
                                duration: 4000
                            }
                        );
                        return false;
                    }

                    return true;
                }),
                // @ Catch validation errors
                filter(response => {
                    // @ errors exists
                    if (
                        response.errors !== undefined &&
                        response.errors.length
                    ) {
                        this.errors = AppUtils.handleValidationGqlErrors(
                            response.errors
                        );
                    }

                    // @ found Validation errors
                    if (this.errors.length) {
                        this.onFormStatusChanged(
                            this.formStatusEnum.validationError
                        );

                        this.snackBar.open('An error Occurred', 'CLOSE', {
                            panelClass: 'm-24',
                            duration: 4000
                        });
                    } else if (response.errors) {
                        // @ Server side errors
                        const message = response.errors[0].message;
                        console.error(message);
                        const hasDuplicates = message.indexOf('duplicate') > 0;
                        if (hasDuplicates) {                            
                            this.onFormStatusChanged(
                                this.formStatusEnum.duplicates
                            );
                        } else {
                            this.onFormStatusChanged(this.formStatusEnum.error);
                        }
                    }

                    // @ if errors
                    return response.errors !== undefined &&
                        response.errors.length
                        ? false
                        : true;
                })
            )
            .subscribe(
                response => {
                    this.onFormStatusChanged(this.formStatusEnum.saved);

                    if (response.data.updateDrug) {
                        this.errors = [];
                        AppUtils.SetFormPrestine(this.form);
                        this.isDirty = false;
                        const drug = Object.assign({}, this.drug);
                        this.drug = AppUtils.mergeForForms(
                            drug,
                            response.data.updateDrug
                        );
                        this.snackBar.open('Drug updated', 'CLOSE', {
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
        this._router.navigate(['/settings/drugs']);

        // if (this.isDirty) {
        //     const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        //         minWidth: '350px',
        //         data: { isDirty: this.isDirty }
        //     });

        //     dialogRef.afterClosed().subscribe(result => {
        //         if (result) {
        //             this._router.navigate(['/settings/drugs']);
        //         }
        //     });
        // } else {
        //     this._router.navigate(['/settings/drugs']);
        // }
    }

    // @ Save Button
    saveChanges(): void {
        if (AppUtils.validateForm(this.form, true)) {
            this.onDrugProcessor.next(this.drug);
        }
    }

    onFormStatusChanged(status: string): void {
        this.formStatus = status;
    }
}
