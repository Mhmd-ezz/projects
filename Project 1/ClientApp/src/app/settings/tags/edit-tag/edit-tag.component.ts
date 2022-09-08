
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';

import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { Logger } from '@nsalaun/ng-logger';
import { Subject } from 'rxjs';
import { catchError, debounceTime, switchMap, takeUntil, tap, distinctUntilChanged, filter } from 'rxjs/operators';

import { updateTagGqlCallback } from 'app/blocks/graphql/callback/updateTagGqlCallback';
import { AppUtils } from 'app/blocks/utils';
import { TagGQL, UpdateTagGQL } from './../../../blocks/graphql/generated/gqlServices';
import { TagInputBase } from 'app/blocks/graphql/generated/bases';
import { FormStatusEnum } from 'app/blocks/components/mdc-form-status/form-status.enum';

@Component({
    selector: 'edit-tag',
    templateUrl: './edit-tag.component.html',
    styleUrls: ['./edit-tag.component.scss']
})
export class EditTagComponent implements OnInit, OnDestroy {

    groups = ['Patient', 'Condition', 'Followup'];
    @ViewChild('form', { static: true }) public form: NgForm;

    // Private
    private _unsubscribeAll: Subject<any>;
    private savingDelay = 3000;

    public onTagChange: Subject<any>;
    public tag: TagInputBase = new TagInputBase();
    public onTagProcessor: Subject<any>;
    public formStatus: string = null;
    public isDirty = false;
    public errors = [];
    public formStatusEnum: typeof FormStatusEnum = FormStatusEnum;

    constructor(
        private _updateTagGQL: UpdateTagGQL,
        private _tagGQL: TagGQL,
        private snackBar: MatSnackBar,
        private _router: Router,
        private _route: ActivatedRoute,
        private dialog: MatDialog,
        private _logger: Logger,

    ) {
        // Set the private defaults
        this._unsubscribeAll = new Subject();
        this.onTagChange = new Subject();
        this.onTagProcessor = new Subject();
    }

    ngOnInit(): void {

        // @ Extract tag id from route params and get tag
        this._route.paramMap
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(params => {
                const id = params.get('id');
                if (id) {
                    this._tagGQL
                        .watch({ id: id })
                        .valueChanges
                        .pipe(takeUntil(this._unsubscribeAll))
                        .subscribe(
                            (response) => {

                                if (response.data && response.data.tag) {
                                    this.tag = AppUtils.mergeForForms(this.tag, response.data.tag);
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
                        this.onTagChange.next(this.tag);
                    }
                }, 0);

            });


        // @ SEND REQUEST 
        this.onTagChange
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
                x => this.onTagProcessor.next(x)
            );

        this.onTagProcessor
            .pipe(takeUntil(this._unsubscribeAll))
            .pipe(
                distinctUntilChanged(),
                switchMap(x => {

                    if (this.tag.id) {

                        this.onFormStatusChanged(this.formStatusEnum.saving);

                        return this._updateTagGQL.mutate(
                            { tag: this.tag },
                            {
                                optimisticResponse: updateTagGqlCallback.optimisticResponse(this.tag),
                                update: (proxy, ev) => updateTagGqlCallback.update(proxy, ev)
                            }
                        );

                    } else {
                        this.onFormStatusChanged(this.formStatusEnum.error);
                        console.error('[ERROR]: could not find tag id.');
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


                    if (response.data.updateTag) {
                        this.errors = [];
                        AppUtils.SetFormPrestine(this.form);
                        this.isDirty = false;
                        const tag = Object.assign({}, this.tag);
                        this.tag = AppUtils.mergeForForms(tag, response.data.updateTag);
                        this.snackBar.open('Tag updated', 'CLOSE', {
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

        this._router.navigate(['/settings/tags']);

        // if (this.isDirty) {
        //     const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        //         minWidth: '350px',
        //         data: { isDirty: this.isDirty }
        //     });

        //     dialogRef.afterClosed().subscribe(result => {
        //         if (result) {
        //             this._router.navigate(['/settings/tags']);
        //         }
        //     });
        // } else {
        //     this._router.navigate(['/settings/tags']);
        // }
    }

    // @ Save Button  
    saveChanges(): void {
        if (AppUtils.validateForm(this.form, true)) {
            this.onTagProcessor.next(this.tag);
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
    //             this.tag = new TagInputBase();
    //             this.form.reset(this.tag);
    //             this.formStatus = "";
    //         }
    //     });
    // }
}
