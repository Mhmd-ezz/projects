import { Apollo } from 'apollo-angular';
import { DeletePatientGQL, Tag } from './../../blocks/graphql/generated/gqlServices';
import { DuplicatePatientDialogComponent } from './duplicate-patient-dialog/duplicate-patient-dialog.component';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Logger } from '@nsalaun/ng-logger';
import { BreadcrumbService } from 'angular-crumbs';
import { ActivatedRoute, Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { PatientService } from '../patient.service';
import { Subject } from 'rxjs';
import { takeUntil, debounceTime, distinctUntilChanged, filter, tap } from 'rxjs/operators';
import { FuseConfigService } from '@fuse/services/config.service';
import { Patient } from '../../blocks/graphql/generated/gqlServices';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmActionSheetArgs } from 'app/blocks/interface/confirm-action-sheet-args';
import { ConfirmActionSheetComponent } from 'app/blocks/components/confirm-action-sheet/confirm-action-sheet.component';
import { AppUtils } from 'app/blocks/utils';
import { FormUtilsService } from 'app/blocks/utils/form-utils.service';
import { TenantsService } from 'app/blocks/services/tenants.service';

import * as fromRoot from '@appStore/reducers';
import * as fromSelectors from '@appStore/selectors';
import * as fromActions from '@appStore/actions';
import { Store } from '@ngrx/store';
import { Tenant } from 'app/blocks/common/tenant.model';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { DataUtilsService } from 'app/blocks/utils/data-utils.service';
import { Title } from '@angular/platform-browser';
import capitalize from 'lodash/capitalize';

@Component({
    selector: 'app-patient',
    templateUrl: './patient.component.html',
    styleUrls: ['./patient.component.scss'],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None,
})
export class PatientComponent implements OnInit {

    // Private
    readonlyTag = true;
    public tags: Array<Tag> = [];
    private _unsubscribeAll: Subject<any>;
    // private fromServer: Subject<any>;
    private onPatientChange: Subject<any>;
    private fuseConfigTemp: any;
    public patient: Patient = {} as Patient;
    public patientId: string;
    public isInfoExpanded = true;
    public sideBarFolded = true;
    // private dataFromServer$ : Observable<Patient>;
    serverNotReachable = true;
    public tenant: Tenant;
    constructor(
        private _logger: Logger,
        private _patientsService: PatientService,
        private _breadcrumbService: BreadcrumbService,
        private _titleService: Title,
        private _route: ActivatedRoute,
        private _router: Router,
        private _fuseConfigService: FuseConfigService,
        private _mediaObserver: MediaObserver,
        private _bottomSheet: MatBottomSheet,
        public dialog: MatDialog,
        private snackBar: MatSnackBar,
        private apollo: Apollo,
        private _store: Store<fromRoot.AppState>,
        private _formUtilsService: FormUtilsService,
        private _tenantsService: TenantsService,
        private ngxLoader: NgxUiLoaderService,
        private _dataUtilsService: DataUtilsService,


    ) {
        // @ Set the private defaults
        this.onPatientChange = new Subject();
        this._unsubscribeAll = new Subject();
        // this.fromServer=new Subject();
        // console.log('load patient')
        this._store.dispatch(fromActions.loadPatient({ id: this._route.snapshot.params.id }));

        // @ Set navbar to folded
        // this.fuseConfigTemp = Object.assign({}, fuseConfig);;
        // this.fuseConfigTemp.layout.navbar.folded = true;
        // this._fuseConfigService.setConfig(this.fuseConfigTemp)
    }

    // @ TODO : Delete / Just to review
    //   let pat = Immutable.Map(this.patient).delete('telephone');
    //   let newData = Immutable.Map({name: "hasan"});
    //   this.patient  = pat.mergeDeep(newData).toJS()


    ngOnInit() {

        // this.dataFromServer$ = this._store.select(selectedPatientSelector)
        // .pipe(takeUntil(this._unsubscribeAll),            
        //     map(data => data.data))


        // this.dataFromServer$
        // .pipe(takeUntil(this._unsubscribeAll))
        // .subscribe((patient) => {
        //     if(patient)
        //     this._dataUtilsService.dataFromServer();
        //     else
        //     this._dataUtilsService.serverNotReachable();
        // })

        // this.watchServer()
        this.ngxLoader.startLoader('loader-01');
        this._mediaObserver.media$
            .pipe(
                takeUntil(this._unsubscribeAll),
                debounceTime(500),
                distinctUntilChanged()
            )
            .subscribe((change: MediaChange) => {
                if (change.mqAlias === 'xs') {
                    this.isInfoExpanded = false;
                }
            });

        this._store.select(fromSelectors.deletePatientSelector)
            .pipe(
                takeUntil(this._unsubscribeAll),
                // tap(data => console.log('deleted',data)),
                filter(data => !!data)
            )
            .subscribe(() => {
                this._formUtilsService.popup('Patient deleted.');

                // @ Temporery delete fragment, library doesn't contain evict method to remove patient locally
                //  this.apollo.getClient().cache['data'].delete('LightPatient:5dd4efb1dc88fa19bb1ba5d3');
                //  this.apollo.getClient().cache['data'].delete('Patient:5dd4efb1dc88fa19bb1ba5d3');
                //  this.apollo.getClient().cache['data'].delete('Contact:5dd4efb1dc88fa19bb1ba5d3');

                this._router.navigate(['/patients']);
            });
        // @ Get tags       
        this._store.select(fromSelectors.Tags)
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(data => {
                if (data) {
                    this.tags = data;
                }
            });


        this._store.select(fromSelectors.selectedPatientSelector)
            .pipe(takeUntil(this._unsubscribeAll),
                filter(data => !!data)
            )
            .subscribe((data) => {
                if (data && data.data) {
                    // this.patient =data.data 
                    this.serverNotReachable = false;
                    this.patient = null;
                    this.patient = AppUtils.mergeForForms(this.patient, data.data);
                    this.SetBreadcrumb(this.patient.name);
                }
                else {
                    this.serverNotReachable = true;
                }
                // if(this.patient.name===undefined )
                // {
                //     console.log('inside patient')
                //     this.fromServer.next(this.patient.name);
                // }
                this.ngxLoader.stopLoader('loader-01');
            });
        this._store.select(fromSelectors.patientSavedLocallySelector)
            .pipe(
                takeUntil(this._unsubscribeAll),
                // tap(data => console.log('no internet',data)),
                filter(data => !!data)
            )
            .subscribe(() => {
                this._formUtilsService.formSavedLocally();
            });
        // this._store.select(fromSelectors.selectedPatientSelector)
        // .pipe(takeUntil(this._unsubscribeAll))
        // .subscribe(data => {
        //     if (data && data.data){
        //         this.patient = AppUtils.mergeForForms(this.patient, data.data);
        //         this.SetBreadcrumb(this.patient.name);
        //     }
        // })

        this._store.select(fromSelectors.error)
            .pipe(
                takeUntil(this._unsubscribeAll),
                // tap(error => console.log('error',error)),
                filter(data => !!data)
            )
            .subscribe(error =>
                this._formUtilsService.popup('An error Occurred' + error)
            );
        // this._store.select(contactsTotalSelector)
        // .pipe(takeUntil(this._unsubscribeAll),
        //     tap(data => console.log(data)),
        //     map(data => data.total))




        this.loadTenantData();
        this.loadTags();
        this.watchPatientChangesProcessor();




    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
        this.patient = null;
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    SetBreadcrumb(patientName: string) {
        // @ Set Breadcrumb to patient name
        setTimeout(() => this._breadcrumbService.changeBreadcrumb(this._route.snapshot, (patientName || 'loading...')), 10);
        this._titleService.setTitle(capitalize(patientName));
    }


    onEdit() {
        if (this.tenant.speciality.key === 'general') {
            this._router.navigate(['/patients', this.patient.id, 'edit']);
        }
        else
            if (this.tenant.speciality.key === 'cardiology') {
                this._router.navigate(['/patients', this.patient.id, 'editCardio']);
            }
    }

    toggle() {
        this.isInfoExpanded = !this.isInfoExpanded;
    }

    onToggleSidebar() {
        this.sideBarFolded = !this.sideBarFolded;
    }

    onTagChange(eventData: any) {
        if (eventData) {
            this.patient.patientInfo.tags = eventData.data;
            this.onPatientChange.next(this.patient);
        }

    }
    editTag() {
        this.readonlyTag = !this.readonlyTag;

    }

    // private watchServer() {
    //     // @ SEND REQUEST 
    //     this.fromServer
    //         .pipe(takeUntil(this._unsubscribeAll))
    //         .pipe(

    //             tap(() => {               
    //                 if (this.patient.name===undefined){
    //                    this._dataUtilsService.serverNotReachable();
    //                     console.log('we r inside')}
    //             })
    //         )
    //         .subscribe();
    // }
    private watchPatientChangesProcessor() {
        // @ SEND REQUEST 
        this.onPatientChange
            .pipe(takeUntil(this._unsubscribeAll))
            .pipe(

                tap(() => {
                    if (this.patient.id) {

                        this._store.dispatch(fromActions.updatePatient({ patient: this.patient }));
                    }

                })
            )
            .subscribe();
    }
    openDuplicateDialog() {


        const dialogRef = this.dialog.open(DuplicatePatientDialogComponent, {
            disableClose: true,
            height: '90vh',
            // minWidth: '320px',
            data: { patientId: this.patient.id, isDuplicate: this.patient.isDuplicate },
        });

        dialogRef.afterClosed()
            .subscribe(data => {

                if (typeof data !== 'undefined' && data != null && data) {
                    this.patient.isDuplicate = data.isDuplicate;
                }
            });

        return dialogRef;
    }

    onDelete() {

        // @ Prevent delete request when offline
        if (navigator.onLine === false) {
            // @ we are offline do something
            this._formUtilsService.popup('Internet access is needed to delete patient.');
            // this.snackBar.open('Internet access is needed to delete patient.', 'CLOSE', {
            //     panelClass: 'm-24',
            //     duration: 8000,
            // });
            return false;
        }

        const args: ConfirmActionSheetArgs = {
            yes: 'I\'m sure want to delete this patient.',
            no: 'No don\'t delete'
        };
        const Confirmsheet = this._bottomSheet.open(ConfirmActionSheetComponent, {
            data: args,
            disableClose: true
        });

        Confirmsheet.afterDismissed().subscribe(result => {
            if (typeof result !== 'undefined' && result) {
                this.deletePatient();
            }
        });

    }

    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------
    private loadTenantData() {

        this._store.select(fromSelectors.getTenant)
        // this._tenantsService.currentTenant$
            .pipe(
                takeUntil(this._unsubscribeAll))
            .subscribe(
                (tenant) => {
                    if (tenant === null) { return; }

                    this.tenant = Object.assign({}, tenant);
                },
                (error) => {
                    console.error('[ERROR]:', error);
                });
    }

    private loadTags() {

        // @ Get tags
        this._store.dispatch(fromActions.loadTags({ group: 'patient' }));
    }
    deletePatient() {
        this._store.dispatch(fromActions.deletePatient({ id: this.patient.id }));

        // this._deletePatientGQL
        //     .mutate(
        //         { patientId: this.patient.id },

        //     )
        //     .pipe(
        //         // @ Catch when saved locally
        //         filter((response) => {

        //             if (response['dataPresent']) {

        //                 this.snackBar.open("No internet access, Saved locally", 'CLOSE', {
        //                     panelClass: "m-24",
        //                     duration: 4000,
        //                 });
        //             }
        //             // @ Always pass through
        //             return true
        //         }),

        //         // @ Catch validation errors
        //         filter((response) => {
        //             let errors: any[] = []
        //             // @ errors exists
        //             if (response.errors != undefined && response.errors.length)
        //                 errors = AppUtils.handleValidationGqlErrors(response.errors)

        //             // @ found Validation errors
        //             if (errors.length) {

        //                 this.snackBar.open("An error Occurred", 'CLOSE', {
        //                     panelClass: "m-24",
        //                     duration: 4000,
        //                 });
        //             }

        //             // @ if errors 
        //             return response.errors != undefined && response.errors.length ? false : true;
        //         })
        //     )
        //     .subscribe((response) => {
        //         if (response && response.data && response.data.deletePatient == 'ok') {
        //             this.snackBar.open('Patient deleted.', 'CLOSE', {
        //                 panelClass: 'm-24',
        //                 duration: 4000,
        //             });

        //             // @ Temporery delete fragment, library doesn't contain evict method to remove patient locally
        //             this.apollo.getClient().cache['data'].delete("LightPatient:5dd4efb1dc88fa19bb1ba5d3")
        //             this.apollo.getClient().cache['data'].delete("Patient:5dd4efb1dc88fa19bb1ba5d3")
        //             this.apollo.getClient().cache['data'].delete("Contact:5dd4efb1dc88fa19bb1ba5d3")

        //             // // @ Clear the whole persisted Graphql data
        //             // window.GraphQlCachePersistor.purge()

        //             this._router.navigate(['/patients']);
        //         }
        //     })
    }


}
