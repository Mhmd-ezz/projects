import { Component, Inject, OnInit} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { outputDataEvent } from 'app/blocks/components/surgery-table/eventData.model';
import { CardiologySurgicalHistoryBase } from 'app/blocks/graphql/generated/bases';
interface SurgicalHistoryArgs {
    surgery?: CardiologySurgicalHistoryBase;
}

@Component({
    selector: 'edit-surgery-dialog',
    templateUrl: './edit-surgery-dialog.component.html',
    styleUrls: ['./edit-surgery-dialog.component.scss']
})
export class EditSurgeryDialogComponent implements OnInit {

    model: SurgicalHistoryArgs = {};
    private _unsubscribeAll: Subject<any>;
    surgeryForm: FormGroup;
    types = [
        {value: 'cvs_endovascular_procedure', name: 'CVS / Endovascular Procedure'},
        {value: 'cvs_surgical', name: 'CVS / Surgical '},
        {value: 'chest_surgery', name: 'Chest surgery'},
        {value: 'orthopedic_surgery', name: 'Orthopedic surgery'}, 
        {value: 'neuro_surgery', name: 'Neuro surgery'},
        {value: 'thyroid_surgery', name: 'Thyroid surgery'},
        {value: 'general_surgery', name: 'General surgery'},

    ];
    constructor(
        public dialogRef: MatDialogRef<EditSurgeryDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: SurgicalHistoryArgs,        
        private _formBuilder: FormBuilder,

    ) {
        this._unsubscribeAll = new Subject();
    }
    ngOnInit() {

         if (this.data) {
            this.model = Object.assign({}, this.data);
         this.model.surgery = this.model.surgery ? this.model.surgery : new CardiologySurgicalHistoryBase();

         } else {
            this.model.surgery = new CardiologySurgicalHistoryBase();
         }
         
        this.createSurgeryForm();
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
    createSurgeryForm(): FormGroup {
        this.surgeryForm = this._formBuilder.group({
    
          // what: [this.model.surgery.what],
          when: [this.model.surgery.when ],
          note: [this.model.surgery.note],
          type: [this.model.surgery.type],
        },
        );
        return this.surgeryForm;
    }

    cancel() {
        
        this.dialogRef.close(null);
    }

    saveSurgery() {        
        this.model.surgery.when = this.surgeryForm.controls['when'].value;
        this.model.surgery.note = this.surgeryForm.controls['note'].value;
        this.model.surgery.type = this.surgeryForm.controls['type'].value;
        this.dialogRef.close(this.model);
    }


    lookupNotifyHandler(eventData: outputDataEvent) {        
        this.model.surgery.what = eventData.data;         
    }
 

}
