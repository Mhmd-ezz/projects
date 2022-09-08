import { Component, OnInit, Input } from '@angular/core';
import * as fromRoot from '@appStore/reducers';
import * as fromSelectors from '@appStore/selectors';
import * as fromActions from '@appStore/actions';
import * as fromReducers from '@appStore/reducers';
import { Store, select } from '@ngrx/store';
import { Medication } from 'app/fake-db/medication.model';
import { filter, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { updateDrugGqlCallback } from 'app/blocks/graphql/callback/updateDrugGqlCallback';
import { PatientMedicationsBase, PatientMedicationsInputBase } from 'app/blocks/graphql/generated/bases';
import { PatientMedications } from 'app/blocks/graphql/generated/gqlServices';
import { FormUtilsService } from 'app/blocks/utils/form-utils.service';
import { MedicationFormDialogService } from '../medication-form-dialog/medication-form-dialog.service';

@Component({
  selector: 'app-medications',
  templateUrl: './medications.component.html',
  styleUrls: ['./medications.component.scss']
})
export class MedicationsComponent implements OnInit {

  @Input('patientId') public patientId: string;
  @Input('conditionId') public conditionId: string;
  @Input('followupId') public followupId: string;
  public medication: any;
  // Private
  private _unsubscribeAll: Subject<any>;


  constructor(
    private _store: Store<fromRoot.AppState>,
    private _route: ActivatedRoute,
    private _formUtilsService: FormUtilsService,
    private _medicationFormDialogService: MedicationFormDialogService,

  ) {
    this._unsubscribeAll = new Subject();

  }

  ngOnInit() {

    this._store.dispatch(fromActions.loadMedications({ patientId: this.patientId }));
    // @ Get medications 
    this._store.select(fromSelectors.medications)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(data => {
        if (data) {
          this.medication = data
        }

      })

    // @ On save locally
    this._store.select(fromSelectors.medicationSavedLocallySelector)
      .pipe(takeUntil(this._unsubscribeAll),
        filter(data => !!data)
      )
      .subscribe(_ => {

        this._formUtilsService.formSavedLocally()
        this._formUtilsService.popup('No internet access, Saved locally')
        //this.medication = data
      })

  }

  newMedication() {
    if (this.conditionId || this.followupId)
      this._medicationFormDialogService.openDialog({ action: "new", patientId: this.patientId, conditionId: this.conditionId, followupId: this.followupId })
    else
      this._formUtilsService.popup('Missing Required Fields')
  }
}
