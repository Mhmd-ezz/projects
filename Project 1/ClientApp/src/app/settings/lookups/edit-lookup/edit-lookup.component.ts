import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Logger } from '@nsalaun/ng-logger';
import * as automapper from 'automapper-ts';
import { ReplaySubject, Subject } from 'rxjs';
import { catchError, debounceTime, switchMap, takeUntil, tap, filter } from 'rxjs/operators';
import { ConstantsService } from '../../../blocks/common/constants.service';
import { LookupInputBase } from '../../../blocks/graphql/generated/bases';
import { UpdateLookupGQL, LookupByTextGQL } from '../../../blocks/graphql/generated/gqlServices';
import { AppUtils } from '../../../blocks/utils';
import { LookupInput } from '../../../blocks/graphql/generated/gqlServices';
import { updateLookupGqlCallback } from '../../../blocks/graphql/callback/updateLookupGqlCallback';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormStatusEnum } from 'app/blocks/components/mdc-form-status/form-status.enum';
import { TenantsService } from 'app/blocks/services/tenants.service';
import { SpecialityEnum } from 'app/blocks/enum/speciality.enum';

import * as fromRoot from '../../../store/reducers';
import * as fromSelectors from '../../../store/selectors';
import { Store as NgrxStore }  from '@ngrx/store';


@Component({
    selector: 'edit-lookup',
    templateUrl: './edit-lookup.component.html',
    styleUrls: ['./edit-lookup.component.scss'],

})
export class EditLookupComponent implements OnInit {

    @ViewChild('form', { static: true}) public form: NgForm;

    // Private
    private _unsubscribeAll: Subject<any>;
    private savingDelay = 3000;

    public filteredGroups: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);
    public onLookupChange: Subject<any>;
    public lookup: LookupInput = new LookupInputBase();
    public formStatus: string = null;
    public lookupGroupFilterCtrl = new FormControl('');
    public lookupsGroups: any[];
    public isDirty = false;
    public errors = [];
    public formStatusEnum: typeof FormStatusEnum = FormStatusEnum;

    constructor(
        private _constantsService: ConstantsService,
        private _updateLookupGQL: UpdateLookupGQL,
        private _lookupByTextGQL: LookupByTextGQL,
        private _route: ActivatedRoute,
        private _logger: Logger,
        private snackBar: MatSnackBar,
        private _router: Router,
        private tenantsService: TenantsService,
        private _store: NgrxStore<fromRoot.AppState>,

    ) {
        // @ Set the private defaults
        this._unsubscribeAll = new Subject();
        this.onLookupChange = new Subject();

         // @ load groups from constants based on tenant speciality
         this._store.select(fromSelectors.getTenant)
        //  this.tenantsService.currentTenant$
         .pipe(takeUntil(this._unsubscribeAll))
         .subscribe(
             (tenant) => {
                 if (tenant === null) { return ; }

                 if (tenant.speciality.key === SpecialityEnum.general) {
                     this.lookupsGroups = this._constantsService.GeneralSpecialityLookups;
                 }
                 else if (tenant.speciality.key === SpecialityEnum.cardiology) {
                     this.lookupsGroups = this._constantsService.CardiologySpecialityLookups;
                      }

                 // @ filter groups
                 this.filteredGroups.next(this.lookupsGroups.slice());
             },
             (error) => {
                 this.snackBar.open('An error occurred', 'CLOSE', {
                     panelClass: 'm-24',
                     duration: 6000,
                 });
             });
    }

    ngOnInit() {

        this._route.paramMap
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(params => {
                // let id = params.get("id");
                const groupKey = params.get('groupkey');
                const text = params.get('text');

                // @ Server Request : get lookup by id
                this._lookupByTextGQL
                    .watch({ group: groupKey, text: text })
                    .valueChanges
                    .pipe(takeUntil(this._unsubscribeAll))
                    .subscribe(
                        ({ data }) => {

                            if (data && data.lookupByText) {

                                // @ Gql updateLookup is instanceof lookupInput then convert the returned Lookup type to LookupInput
                                const mappedLookup = automapper.map('Lookup', 'LookupInputBase', data.lookupByText);
                                this.lookup = AppUtils.mergeForForms(this.lookup, mappedLookup);
                            }
                        },
                        (error) => {
                            this.onFormStatusChanged(this.formStatusEnum.error);
                            this._logger.error(error);
                        });
            });

       
        // listen for search field value changes
        this.lookupGroupFilterCtrl.valueChanges
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(() => {
                this.filterGroups();
            });

        // @ Subscribe for form changes
        this.form.valueChanges
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(data => {
                setTimeout(() => {
                    if (this.form.dirty) {
                        this.onLookupChange.next(this.lookup);
                    }
                }, 0);
            });

        // @ SEND REQUEST 
        this.onLookupChange
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
                    if (this.lookup.id) {

                        this.onFormStatusChanged(this.formStatusEnum.saving);


                        // @ important :the new lookup is lookupInput type which has different properties from lookup type
                        // @ while store expects normal lookup type
                        // @ so we need to map the lookupinput type to lookup type to avoid store errors
                        const mappedLookup = automapper.map('LookupInputBase', 'LookupBase', this.lookup);

                        // @ server expects LookupInput type
                        const mappedLookupInput = automapper.map('Lookup', 'LookupInputBase', this.lookup);

                        return this._updateLookupGQL.mutate(
                            { lookup: mappedLookupInput },
                            {
                                optimisticResponse: updateLookupGqlCallback.optimisticResponse(mappedLookup),
                                update: (proxy, ev) => updateLookupGqlCallback.update(proxy, ev)
                            }
                        );
                    } else {
                        this.onFormStatusChanged(this.formStatusEnum.saving);
                        this._logger.error('[ CATCH ERROR ]: ', 'Lookup id is undefined !');
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

                    if (response.data.updateLookup) {
                        this.errors = [];
                        AppUtils.SetFormPrestine(this.form);
                        const condition = Object.assign({}, this.lookup);
                        this.lookup = AppUtils.mergeForForms(condition, response.data.updateLookup);
                        this.snackBar.open('Lookup updated', 'CLOSE', {
                            panelClass: 'm-24',
                            duration: 2000,
                        });
                        this.isDirty = false;
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
    // @ Save Button  
    saveChanges() {
        if (AppUtils.validateForm(this.form, true)) {
            this.onLookupChange.next(this.lookup);
        }
    }

    onDone() {

        this._router.navigate(['/settings/lookups']);

        // const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        //     minWidth: '350px',
        //     data: { isDirty: this.isDirty, }
        // });

        // dialogRef.afterClosed().subscribe(result => {
        //     if (result) {
        //         this._router.navigate(['/settings/lookups']);
        //     }
        // });
    }

    onFormStatusChanged(status: string) {
        this.formStatus = status;
    }

    private filterGroups() {
        if (!this.lookupsGroups) {
            return;
        }
        // get the search keyword
        let search = this.lookupGroupFilterCtrl.value;
        if (!search) {
            this.filteredGroups.next(this.lookupsGroups.slice());
            return;
        } else {
            search = search.toLowerCase();
        }
        // filter the banks
        this.filteredGroups.next(
            this.lookupsGroups.filter(o => o.text.toLowerCase().indexOf(search) > -1)
        );
    }

}
