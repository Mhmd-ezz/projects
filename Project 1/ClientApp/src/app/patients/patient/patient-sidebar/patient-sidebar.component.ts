import { SpecialityEnum } from './../../../blocks/enum/speciality.enum';
import { Component, Input } from '@angular/core';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { PatientMediaPoolFilesGQL } from 'app/blocks/graphql/generated/gqlServices';
import { ActivatedRoute } from '@angular/router';
import { PatientService } from 'app/patients/patient.service';
import * as localforage from "localforage";
import { LocalDbInstances } from 'app/blocks/enum/local-db-instances.enum';
import { Tenant } from 'app/blocks/common/tenant.model';

import * as fromRoot from '@appStore/reducers';
import * as fromSelectors from '@appStore/selectors';
import * as fromActions from '@appStore/actions';
import { Store } from '@ngrx/store';
import { FormUtilsService } from 'app/blocks/utils/form-utils.service';
import { TenantsService } from 'app/blocks/services/tenants.service';


@Component({
    selector: 'app-patient-sidebar',
    templateUrl: './patient-sidebar.component.html',
    styleUrls: ['./patient-sidebar.component.scss']
})
export class PatientSidebarComponent {

    @Input() patientId: string;
    private _unsubscribeAll: Subject<any>;

    activeSpeciality: string;
    mediaPoolCount: number = 0;
    SpecialityEnum: typeof SpecialityEnum = SpecialityEnum;


    constructor(
        private _fuseSidebarService: FuseSidebarService,
        private _patientMediaPoolFilesGQL: PatientMediaPoolFilesGQL,
        private _route: ActivatedRoute,
        private _patientService: PatientService,
        private _store: Store<fromRoot.AppState>,
        private _formUtilsService: FormUtilsService,
        private _tenantsService: TenantsService,

    ) {
        // @ Set the private defaults
        this._unsubscribeAll = new Subject();
        // // this._route.params.pipe(takeUntil(this._unsubscribeAll))
        // //     .subscribe(params => {
        // //         this._store.dispatch(fromActions.loadPatient({ id: params["id"] }))
        // //     });
    }

    ngOnInit(): void {

        this._store.select(fromSelectors.selectedPatientSelector)
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(data => {
                if (data && data.data) {
                    this.patientId = data.data.id
                    this.loadPatientMediaPoolFiles()
                }
            })
        //this.getPatientId()
        this.watchPatientMedia()
        this.getTenantData()
        // this.loadPatientMediaPoolFiles()

        this._store.select(fromSelectors.mediaPoolFiles)
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(response => {
                if (response) {

                    let files = Object.assign([], response);
                    if (files.length > 0)
                        this.mediaPoolCount = files.length
                    else
                        this.mediaPoolCount = 0
                }
            })
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    /**
  * Toggle sidebar
  *
  * @param name
  */
    toggleSidebar(name): void {
        this._fuseSidebarService.getSidebar(name).toggleOpen();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------

    private watchPatientMedia() {
        this._patientService.onpatientMediaPoolChange.subscribe(data => {
            this.loadPatientMediaPoolFiles()
        })
    }

    //private getPatientId() {
    // @ Extract patient id from URL
    // this._store.select(fromSelectors.selectedPatientSelector)
    //     .pipe(takeUntil(this._unsubscribeAll))
    //     .subscribe(data => {
    //         if (data && data.data) {
    //             this.patientId = data.data.id
    //             this.loadPatientMediaPoolFiles()
    //         }
    //     })

    // @ Extract patient id from URL
    // this._route.params.subscribe(params => {
    //     if (params["id"]) {
    //         this.patientId = params["id"]
    //         this.loadPatientMediaPoolFiles()
    //     }

    // })
    // }

    private loadPatientMediaPoolFiles() {
        if (!this.patientId) {
            console.error("[ERROR]: Could not find patient id.")
            return false
        }

        this._store.dispatch(fromActions.LoadPatientMediaPoolFiles({ patientId: this.patientId }));

        // this._patientMediaPoolFilesGQL.watch({ patientId: this.patientId })
        //     .valueChanges
        //     .pipe(takeUntil(this._unsubscribeAll))
        //     .subscribe(response => {

        //         if (response.data && response.data.patientMediaPoolFiles) {

        //             let files = Object.assign([], response.data.patientMediaPoolFiles);
        //             if (files.length > 0)
        //                 this.mediaPoolCount = files.length
        //             else
        //                 this.mediaPoolCount = 0
        //         }
        //     })
    }

    private getTenantData() {
        this._store.select(fromSelectors.getTenant)
        // this._tenantsService.currentTenant$
        .subscribe(
            (tenant: Tenant) => {

                if (!tenant) return
                
                if (tenant.speciality && tenant.speciality.key)
                    this.activeSpeciality = tenant.speciality.key
                else
                    console.error('[ERROR]: unable to identify tenant speciality.')
            })
    }
}
