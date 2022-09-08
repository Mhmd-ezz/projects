import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Logger } from '@nsalaun/ng-logger';
import { AppUtils } from 'app/blocks/utils';
import { Subject } from 'rxjs';
import { catchError, debounceTime, switchMap, takeUntil, tap, filter } from 'rxjs/operators';
import { updateLocationGqlCallback } from '../../../blocks/graphql/callback/updateLocationGqlCallback';
import { LocationGQL, UpdateLocationGQL, DeleteSubLocationGQL, LocationInput } from '../../../blocks/graphql/generated/gqlServices';
import { LocationBase } from './../../../blocks/graphql/generated/bases';
import { MatSnackBar} from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { FormStatusEnum } from 'app/blocks/components/mdc-form-status/form-status.enum';

@Component({
    selector: 'edit-location',
    templateUrl: './edit-location.component.html',
    styleUrls: ['./edit-location.component.scss']
})
export class EditLocationComponent implements OnInit {

    @ViewChild('form', { static: true}) public form: NgForm;

    // Private
    private _unsubscribeAll: Subject<any>;
    private savingDelay = 3000;

    public onLocationChange: Subject<any>;
    public location = new LocationBase();
    public formStatus: string = null;
    public isDirty = false;
    public errors = [];
    public formStatusEnum: typeof FormStatusEnum = FormStatusEnum;
    public ctrl = new FormControl('');


    constructor(
        private _LocationGQL: LocationGQL,
        private _updateLocationGQL: UpdateLocationGQL,
        private _route: ActivatedRoute,
        private _logger: Logger,
        private snackBar: MatSnackBar,
        private dialog: MatDialog,
        private _router: Router,
        private _deleteSubLocationGQL: DeleteSubLocationGQL,

    ) {
        // Set the private defaults
        this._unsubscribeAll = new Subject();
        this.onLocationChange = new Subject();

    }

    ngOnInit() {

        // @ Extract location id from route params and get location
        this._route.paramMap
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(params => {
                const id = params.get('id');
                if (id) {
                    this._LocationGQL
                        .watch({ id: id })
                        .valueChanges
                        .pipe(takeUntil(this._unsubscribeAll))
                        .subscribe(
                            (response) => {

                                if (response.data && response.data.location) {
                                    this.location = AppUtils.mergeForForms(this.location, response.data.location);
                                }
                            },
                            (error) => {
                                this.onFormStatusChanged(this.formStatusEnum.error);
                                this._logger.error(error);
                            });
                } else {
                    this.onFormStatusChanged(this.formStatusEnum.error);
                    this._logger.error('[Error]: Undefined route parameter -> location id ');
                }

            });

        // @ Subscribe for form changes
        this.form
            .valueChanges
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
                tap(ev => {
                    this.onFormStatusChanged(this.formStatusEnum.pending);
                    this.isDirty = true;
                }),
                debounceTime(this.savingDelay),
            )
            .pipe(
                switchMap(x => {
                    if (this.location.id) {

                        this.onFormStatusChanged(this.formStatusEnum.saving);
                        let location_ = Object.assign({},this.location) as LocationInput;
                        return this._updateLocationGQL
                            .mutate(
                                { location: location_ },
                                {
                                    optimisticResponse: updateLocationGqlCallback.optimisticResponse(this.location),
                                    update: (proxy, ev) => updateLocationGqlCallback.update(proxy, ev)
                                }
                            );
                    } else {

                        this.onFormStatusChanged(this.formStatusEnum.error);
                        this._logger.error('[ CATCH ERROR ]: ', 'Location id is undefined !');
                    }

                }),
                catchError((err, source) => {
                    this.onFormStatusChanged(this.formStatusEnum.error);
                    this._logger.error('[ CATCH ERROR ]: ', err);
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

                    if (response.data.updateLocation) {
                        this.errors = [];
                        AppUtils.SetFormPrestine(this.form);
                        this.isDirty = false;
                        const location = Object.assign({}, this.location);
                        this.location = AppUtils.mergeForForms(location, response.data.updateLocation);
                        this.snackBar.open('Location updated', 'CLOSE', {
                            panelClass: 'm-24',
                            duration: 2000,
                        });
                    }
                },
                (err) => {
                    this._logger.error(err);
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
                this.snackBar.open('Deleting a sub-location need internet access', 'CLOSE', {
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
        } else{
            console.error('Couldn\'t find location id');
        }
    }
}
