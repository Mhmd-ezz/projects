import { Component, OnDestroy, OnInit } from '@angular/core';
import { Logger } from '@nsalaun/ng-logger';
import { Subject } from 'rxjs';
import { takeUntil, debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { PatientService } from '../../../patient.service';
import { MatDialog } from '@angular/material/dialog';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { Patient } from 'app/blocks/graphql/generated/gqlServices';
import { EditCardiologyMedicalHistoryDialogComponent } from '../edit-general-medical-history-dialog/edit-cardiology-medical-history-dialog.component';
import * as fromRoot from '@appStore/reducers';
import * as fromSelectors from '@appStore/selectors';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import * as fromActions from '@appStore/actions';
import { MedicationsMedicalHistoryComponent } from 'app/blocks/components/medications-medical-history/medications-medical-history.component';
@Component({
    selector: 'cardiology-medical-history',
    templateUrl: './cardiology-medical-history.component.html',
    styleUrls: ['./cardiology-medical-history.component.scss']
})
export class CardiologyMedicalHistoryComponent implements OnInit, OnDestroy {

    // Private
    private _unsubscribeAll: Subject<any>;

    public patient: Patient;
    public activeCard: string;
    public medicalHistory: any = {};
    public isExpanded = true;
    public isXs = false;
    public medications;
    /**
    * Constructor
    *
    * @param {Logger} _logger
    * @param {PatientService} _patientsService
    */
    constructor(
        private _logger: Logger,
        private _patientsService: PatientService,
        private dialog: MatDialog,
        private _mediaObserver: MediaObserver,
        private _route: ActivatedRoute,
        private _store: Store<fromRoot.AppState>,

    ) {
        // @ Set the private defaults
        this._unsubscribeAll = new Subject();
        this._route.parent.params
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe(params => {
            this._store.dispatch(fromActions.loadMedications({patientId:params["id"]}))

        } );
    }

    /**
    * On Init
    */
    ngOnInit() {

        this._mediaObserver.media$
            .pipe(
                takeUntil(this._unsubscribeAll),
                debounceTime(500),
                distinctUntilChanged()
            )
            .subscribe((change: MediaChange) => {
                if (change.mqAlias === 'xs') {
                    this.isXs = true;
                    this.isExpanded = false;
                }
                else {
                    this.isXs = false;
                    this.isExpanded = true;
                }

            });

            
             // @ Extract patient id from URL
        this._store.select(fromSelectors.selectedPatientSelector)
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe(data => {
            if (data && data.data) {
            this.patient = data.data;
            // @ In case contact the model doesn't contain patientInfo
                    if (this.patient && this.patient.patientInfo != null) { 
            this.medicalHistory = this.patient.patientInfo.specialities.cardiology.medicalHistory ? this.patient.patientInfo.specialities.cardiology.medicalHistory : {};
                    }         
        
        }}       ); 

        // this._patientsService.onCurrentPatientChanged
        //     .pipe(takeUntil(this._unsubscribeAll))
        //     .subscribe(response => {               
        //         if (response.data && response.data.patient) {
        //             this.patient = response.data.patient;
        //             this.medicalHistory = this.patient.patientInfo.specialities.cardiology.medicalHistory ? this.patient.patientInfo.specialities.cardiology.medicalHistory : {};
        //         }

        //     });
        this._store.select(fromSelectors.medications)
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe(data => {
            if (data) {
                this.medications = data;
            }

        });

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

    edit() {
        // @ navigate to edit patient - > medical history section
        // this._logger.log("Edit Medical History")
    }

    toggle(active: string) {
        this.activeCard = active === this.activeCard ? '' : active;
    }

    trackValue(index, record) {
        return record ? record.value : undefined;
    }

    toggleVisbility() {
        this.isExpanded = !this.isExpanded;
    }

    onEdit(focusOn) {
        const dialogRef = this.dialog.open(EditCardiologyMedicalHistoryDialogComponent, {
            minWidth: '330px',
            data: {
                id: this.patient.id,
                focusOn: focusOn
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
            }
        });
    }
    onEditMedications(){
        const dialogRef = this.dialog.open(MedicationsMedicalHistoryComponent, {
            minWidth: '1500px',
            minHeight:'300px',
            data: {
                id: this.patient.id,                
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
            }
        });
    }
}
