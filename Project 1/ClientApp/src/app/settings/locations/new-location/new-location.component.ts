import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Router } from '@angular/router';
import { updateLocationGqlCallback } from 'app/blocks/graphql/callback/updateLocationGqlCallback';
import { AppUtils } from 'app/blocks/utils';
import { Subject, Observable } from 'rxjs';
import { catchError, debounceTime, filter, switchMap, takeUntil, tap, startWith, map } from 'rxjs/operators';

import { LocationInputBase } from '../../../blocks/graphql/generated/bases';
import { CreateLocationGQL, UpdateLocationGQL, DeleteSubLocationGQL, CreateLocationMutation, UpdateLocationMutation } from '../../../blocks/graphql/generated/gqlServices';
import { FormStatusEnum } from './../../../blocks/components/mdc-form-status/form-status.enum';
import { createLocationGqlCallback } from './../../../blocks/graphql/callback/createLocationGqlCallback';

@Component({
    selector: 'new-location',
    templateUrl: './new-location.component.html',
    styleUrls: ['./new-location.component.scss']
})
export class NewLocationComponent implements OnInit {

    @ViewChild('form', { static: true}) public form: NgForm;

    // Private
    private _unsubscribeAll: Subject<any>;
    private savingDelay = 3000;

    public onLocationChange: Subject<any>;
    public location: LocationInputBase = new LocationInputBase();
    public formStatus: string = null;
    public isDirty = false;
    public errors = [];
    public formStatusEnum: typeof FormStatusEnum = FormStatusEnum;
    public ctrl = new FormControl('');

    constructor(
        private _createLocationGQL: CreateLocationGQL,
        private _updateLocationGQL: UpdateLocationGQL,
        private _deleteSubLocationGQL: DeleteSubLocationGQL,
        private snackBar: MatSnackBar,
        private _router: Router,
        private dialog: MatDialog,
    ) {
        // Set the private defaults
        this._unsubscribeAll = new Subject();
        this.onLocationChange = new Subject();
    }

    ngOnInit() {

        // @ Subscribe for form changes
        this.form.valueChanges
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(data => {
                setTimeout(() => {
                    if (this.form.dirty) {
                        this.onLocationChange.next(this.location);
                    }
                }, 0);
            });


        // @ SEND REQUEST 
        this.onLocationChange
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
                tap(() => {
                    this.onFormStatusChanged(this.formStatusEnum.pending);
                    this.isDirty = true;
                }),
                debounceTime(this.savingDelay),
            )
            .pipe(
                switchMap(() => {
                    if (this.location.id) {

                        this.onFormStatusChanged(this.formStatusEnum.saving);

                        return this._updateLocationGQL.mutate(
                            { location: this.location },
                            {
                                optimisticResponse: updateLocationGqlCallback.optimisticResponse(this.location),
                                update: (proxy, ev) => updateLocationGqlCallback.update(proxy, ev)
                            }
                        );

                    } else {

                        this.onFormStatusChanged(this.formStatusEnum.saving);

                        this.location.id = AppUtils.GenerateObjectId();

                        return this._createLocationGQL.mutate(
                            { location: this.location },
                            {
                                optimisticResponse: createLocationGqlCallback.optimisticResponse(this.location),
                                update: (proxy, ev) => createLocationGqlCallback.update(proxy, ev)
                            }
                        );
                    }
                }),
                catchError((err, source) => {
                    this.onFormStatusChanged(this.formStatusEnum.error);
                    console.error('[ CATCH ERROR ]: ', err);
                    this.snackBar.open('An error occurred', 'CLOSE', {
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

                        this.snackBar.open('An error occurred', 'CLOSE', {
                            panelClass: 'm-24',
                            duration: 4000,
                        });
                    }
                    else {
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
                    
                    let updatedLocation_ = response.data && 'updateLocation' in response.data ? response.data.updateLocation : undefined;
                    let createdLocation_ = response.data && 'createLocation' in response.data ? response.data.createLocation : undefined
                  
                    if(updatedLocation_) {
                        this.errors = [];
                        AppUtils.SetFormPrestine(this.form);
                        this.isDirty = false;
                        const location = Object.assign({}, this.location);
                        this.location = AppUtils.mergeForForms(location, updatedLocation_);
                        this.snackBar.open('Location updated', 'CLOSE', {
                            panelClass: 'm-24',
                            duration: 2000,
                        });
                    }
                    else if (createdLocation_) {
                        this.errors = [];
                        AppUtils.SetFormPrestine(this.form);
                        this.isDirty = false;
                        const location = Object.assign({}, this.location);
                        this.location = AppUtils.mergeForForms(location, createdLocation_);
                        this.snackBar.open('Location created', 'CLOSE', {
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

    onDone() {

        this._router.navigate(['/settings/locations']);

        // const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        //     minWidth: '350px',
        //     data: { isDirty: this.isDirty, }
        // });

        // dialogRef.afterClosed().subscribe(result => {
        //     if (result) {
        //         this._router.navigate(['/settings/locations']);
        //     }
        // });
    }

    // @ Save Button  
    saveChanges() {
        if (AppUtils.validateForm(this.form, true)) {
            this.onLocationChange.next(this.location);
        }
    }

    onFormStatusChanged(status: string) {
        this.formStatus = status;
    }

    addSubLocation() {
        const text = this.ctrl.value;

        // @ push text to list
        this.addValueProcessor(text);
    }

    addValueProcessor(text: string) {

        // @ prevent duplicate
        if (this.location.subLocations.indexOf(text) === -1) {

            // @ push sub location 
            this.location.subLocations.push(text);

            // @ update location
            this.onLocationChange.next(this.location);

            // @ clear ctrl
            this.ctrl.setValue('');

        } else {
            this.snackBar.open(`${text} already added.`, 'CLOSE', {
                panelClass: 'm-24',
                duration: 4000,
            });
        }

    }

    deleteSubLocation(index, item) {

        if (this.location.id) {

            // @ Prevent delete request when offline
            if (navigator.onLine === false) {
                // @ we are offline do something
                this.snackBar.open('To delete sub-location you need internet access', 'CLOSE', {
                    panelClass: 'm-24',
                    duration: 5000,
                });
                return false;
            }

            this._deleteSubLocationGQL
                .mutate({ id: this.location.id, subLocation: item })
                .pipe(takeUntil(this._unsubscribeAll))
                .pipe(
                    tap(() => {
                        this.onFormStatusChanged(this.formStatusEnum.pending);
                        this.isDirty = true;
                    }),
                    catchError((err, source) => {
                        console.log(err);
                        this.onFormStatusChanged(this.formStatusEnum.error);
                        console.error('[ CATCH ERROR ]: ', err);
                        this.snackBar.open('An error occurred', 'CLOSE', {
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

                            this.snackBar.open('An error occurred', 'CLOSE', {
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
                .subscribe(({ data }) => {

                    this.onFormStatusChanged(this.formStatusEnum.saved);

                    // @ deleteSubLocation will return the updated location model 
                    if (data.deleteSubLocation) {
                        this.errors = [];
                        AppUtils.SetFormPrestine(this.form);
                        this.isDirty = false;
                        const location = Object.assign({}, this.location);
                        this.location = AppUtils.mergeForForms(location, data.deleteSubLocation);
                        this.location.subLocations.splice(index, 1);
                        this.snackBar.open('Sub-location deleted', 'CLOSE', {
                            panelClass: 'm-24',
                            duration: 2000,
                        });
                    }
                });
        } else {
            // @ remove directly from array
            this.location.subLocations.splice(index, 1);
        }

    }
  
}
