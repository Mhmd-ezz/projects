import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { updateTagGqlCallback } from 'app/blocks/graphql/callback/updateTagGqlCallback';
import { AppUtils } from 'app/blocks/utils';
import { empty, Subject } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, switchMap, takeUntil, tap, filter } from 'rxjs/operators';
import { TagBase } from '../../../blocks/graphql/generated/bases';
import { createTagGqlCallback } from './../../../blocks/graphql/callback/createTagGqlCallback';
import { CreateTagGQL, TagInput, UpdateTagGQL } from './../../../blocks/graphql/generated/gqlServices';
import { FormStatusEnum } from 'app/blocks/components/mdc-form-status/form-status.enum';


@Component({
    selector: 'new-tag',
    templateUrl: './new-tag.component.html',
    styleUrls: ['./new-tag.component.scss']
})
export class NewTagComponent implements OnInit, OnDestroy {
    @ViewChild('form', { static: true}) public form: NgForm;
    groups = ['Patient', 'Condition', 'Followup'];
    // Private
    private _unsubscribeAll: Subject<any>;
    private savingDelay = 3000;

    public onTagChange: Subject<any>;
    public onTagProcessor: Subject<any>;
    public tag: TagBase = new TagBase();
    public formStatus: string = null;
    public isDirty = false;
    public errors: any = [];
    public formStatusEnum: typeof FormStatusEnum = FormStatusEnum;


    constructor(
        private _createTagGQL: CreateTagGQL,
        private _updateTagGQL: UpdateTagGQL,
        private snackBar: MatSnackBar,
        private _router: Router,
        private dialog: MatDialog
    ) {
        // Set the private defaults
        this._unsubscribeAll = new Subject();
        this.onTagChange = new Subject();
        this.onTagProcessor = new Subject();
    }

    ngOnInit(): void {
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
                debounceTime(this.savingDelay)
            );
        this.onTagProcessor
            .pipe(takeUntil(this._unsubscribeAll))
            .pipe(
                distinctUntilChanged(),
                switchMap(x => {
                    if (this.tag.id) {

                        this.onFormStatusChanged(this.formStatusEnum.saving);

                        let tag_ = Object.assign({},this.tag) as TagInput;

                        return this._updateTagGQL.mutate(
                            { tag: tag_ },
                            {
                                optimisticResponse: updateTagGqlCallback.optimisticResponse(
                                    this.tag
                                ),
                                update: (proxy, ev) =>
                                    updateTagGqlCallback.update(
                                        proxy,
                                        ev
                                    )
                            }
                        );
                    } else {

                        this.onFormStatusChanged(this.formStatusEnum.saving);

                        this.tag.id = AppUtils.GenerateObjectId();

                        let tag_ = Object.assign({},this.tag) as TagInput;

                        return this._createTagGQL.mutate(
                            { tag: tag_ },
                            {
                                optimisticResponse: createTagGqlCallback.optimisticResponse(this.tag),
                                update: (proxy, ev) => createTagGqlCallback.update(proxy, ev)
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

                    if ( 'updateTag' in response.data && response.data.updateTag) {
                        this.errors = [];
                        AppUtils.SetFormPrestine(this.form);
                        this.isDirty = false;
                        const tag = Object.assign({}, this.tag);
                        this.tag = AppUtils.mergeForForms(
                            tag,
                            response.data.updateTag
                        );
                        this.snackBar.open('Tag updated', 'CLOSE', {
                            panelClass: 'm-24',
                            duration: 2000
                        });
                    }
                    else if ( 'createTag' in response.data && response.data.createTag) {
                        this.errors = [];
                        AppUtils.SetFormPrestine(this.form);
                        this.isDirty = false;
                        const tag = Object.assign({}, this.tag);
                        this.tag = AppUtils.mergeForForms(
                            tag,
                            response.data.createTag
                        );
                        this.snackBar.open('Tag created', 'CLOSE', {
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
}
