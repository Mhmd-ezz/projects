import { RemarkDuplicatePatientGQL } from './../../../blocks/graphql/generated/gqlServices';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { filter, takeUntil, tap } from 'rxjs/operators';
import * as fromRoot from '@appStore/reducers';
import * as fromSelectors from '@appStore/selectors';
import { Subject } from 'rxjs';
import * as fromActions from '@appStore/actions';
import { Store } from '@ngrx/store';
import { FormUtilsService } from 'app/blocks/utils/form-utils.service';

interface DuplicatePatientArgs {
    patientId?: string;
    isDuplicate?: boolean;
}

@Component({
    selector: 'app-duplicate-patient-dialog',
    templateUrl: './duplicate-patient-dialog.component.html',
    styleUrls: ['./duplicate-patient-dialog.component.scss']
})
export class DuplicatePatientDialogComponent implements OnInit {

    private _unsubscribeAll: Subject<any>;
    isDuplicate = true;
    model: DuplicatePatientArgs = {};
    errors: any[] = [];

    constructor(
        private _remarkDuplicatePatientGQL: RemarkDuplicatePatientGQL,
        public dialogRef: MatDialogRef<DuplicatePatientDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DuplicatePatientArgs,
        private snackBar: MatSnackBar,
        private _store: Store<fromRoot.AppState>,        
        private _formUtilsService: FormUtilsService,

    ) {   
        this._unsubscribeAll = new Subject();
    }

    ngOnInit() {

        if (this.data) {
            this.model = Object.assign({}, this.data);
            this.model.isDuplicate = this.model.isDuplicate ? this.model.isDuplicate : false;

        } else {
            this.model.isDuplicate = false;
        }
    }

    
    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // ----------------------------------------------------------------------------
    //  Public Methods
    // ----------------------------------------------------------------------------
    onSave() {
        this.sendToBackend(this.model);
    }

    onCancel() {
        this.dialogRef.close(null);
    }

    sendToBackend(data: DuplicatePatientArgs) {

        this._store.dispatch(fromActions.duplicatePatient({id: data.patientId, isDuplicate: data.isDuplicate}));


        this._store.select(fromSelectors.duplicatePatientLocally)
        .pipe(
            takeUntil(this._unsubscribeAll),
            tap(data => console.log('no internet', data)),
            filter(data => !!data)
        )
        .subscribe(() => {
            this._formUtilsService.formSavedLocally();
        });

        this._store.select(fromSelectors.error)
        .pipe(
            takeUntil(this._unsubscribeAll),
            tap(data => console.log('error', data)),
            filter(data => !!data)
        )
        .subscribe((errors) => this._formUtilsService.handleErrors(errors));    
       

        this._store.select(fromSelectors.duplicatePatientSelector)
        .pipe(
            takeUntil(this._unsubscribeAll),
            tap(data => console.log('duplicate', data)),
            filter(data => !!data)
        )
        .subscribe(() => {
                    this.dialogRef.close(this.model);
                });
            
            
       
      
       
        // this._remarkDuplicatePatientGQL
        //     .mutate(
        //         { patientId: data.patientId, isDuplicate: data.isDuplicate },
        //         {
        //             optimisticResponse: remarkDuplicatePatientGqlCallback.optimisticResponse(data),
        //             update: (proxy, ev) => remarkDuplicatePatientGqlCallback.update(proxy, ev, data)
        //         }
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

        //             // @ errors exists
        //             if (response.errors != undefined && response.errors.length)
        //                 this.errors = AppUtils.handleValidationGqlErrors(response.errors)

        //             // @ found Validation errors
        //             if (this.errors.length) {

        //                 this.snackBar.open("An error Occurred", 'CLOSE', {
        //                     panelClass: "m-24",
        //                     duration: 4000,
        //                 });
        //             }

        //             // @ if errors 
        //             return response.errors != undefined && response.errors.length ? false : true;
        //         })
        //     )
        //     .subscribe((data) => {
        //         this.dialogRef.close(this.model);
        //     })
    }

}
