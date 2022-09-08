
import { Component, Input,ElementRef, OnInit, ViewChild,Output,EventEmitter } from '@angular/core';
import {  NgForm, NgModel } from '@angular/forms';
import {  MatDialog } from '@angular/material/dialog';
import {  MatTableDataSource } from '@angular/material/table';

import { outputDataEvent } from 'app/blocks/components/surgery-table-advanced/eventData.model';
import { AppUtils } from 'app/blocks/utils';
import * as moment from 'moment';
import {  Subject,fromEvent } from 'rxjs';
import { CardiologySurgicalHistoryBase, PatientInfoBase, PatientBase } from 'app/blocks/graphql/generated/bases';

import {EditSurgeryDialogComponent} from 'app/patients/patient/edit-surgery-dialog/edit-surgery-dialog.component';
import {  MedicalHistorySurgery } from '../../graphql/generated/gqlServices';
import { DataPartition } from '../../graphql/generated/gqlServices';
import { MdcLookupInputAdvancedPredefinedComponent } from 'app/blocks/components/mdc-lookup-input-advanced-predefined/mdc-lookup-input-advanced-predefined.component';

@Component({
    selector: 'surgery-table-advanced',
    templateUrl: './surgery-table-advanced.component.html',
    styleUrls: ['./surgery-table-advanced.component.scss']
})
export class SurgeryTableAdvancedComponent implements OnInit {

    @ViewChild('form', { static: true }) public form: NgForm;
    @ViewChild("surgeryWhatInput", { static: false }) public surgeryWhatInput: MdcLookupInputAdvancedPredefinedComponent;
    @ViewChild("what", { static: false }) public what: NgModel;


    // Private
    types=[
        {value:'cvs_endovascular_procedure',name:'CVS / Endovascular Procedure'},
        {value:'cvs_surgical',name:'CVS / Surgical '},
        {value:'chest_surgery',name:'Chest surgery'},
        {value:'orthopedic_surgery',name:'Orthopedic surgery'}, 
        {value:'neuro_surgery',name:'Neuro surgery'},
        {value:'thyroid_surgery',name:'Thyroid surgery'},
        {value:'general_surgery',name:'General surgery'},

    ]
    private _unsubscribeAll: Subject<any>;
    private onPatientChange: Subject<any>;  
    public list: CardiologySurgicalHistoryBase[] = [];
    public patient = new PatientBase();

    public surgery: CardiologySurgicalHistoryBase = new CardiologySurgicalHistoryBase();
    public surgeryAgo: number;
    public dataSource;
    public surgeryDisplayedColumns: string[] = ['index','type', 'what', 'when', 'note', "action"];
    @Output() surgeryTable: EventEmitter<outputDataEvent> = new EventEmitter<outputDataEvent>();
    @Input()
    public set dataLink(value: DataPartition | MedicalHistorySurgery) {       
        this.list = value || value['data'];    
        this.dataSource = new MatTableDataSource(this.list);
    };
    @ViewChild('save', { static: true }) public save;
    @ViewChild('input', { static: true }) public input;
    constructor(
       
        private dialog: MatDialog,

    ) {
        // @ Set the private defaults
        this._unsubscribeAll = new Subject();
        this.onPatientChange = new Subject();
       
    }
    ngOnInit() {    
      
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
    lookupNotifyHandlerOperation(eventData: outputDataEvent) {        
        this.surgery.what=eventData.data;  
        console.log('surgeryWhat',this.surgery.what)       
}

    onRemoveSurgery(index) {
        this.list.splice(index, 1);
        this.surgeryTable.emit({data:this.list});
        this.dataSource = new MatTableDataSource(this.list)
    }
    onEditSurgery(index)
    {
        const dialogRef = this.dialog.open(EditSurgeryDialogComponent, {
            minWidth: '80px',
            data: {
                surgery: this.list[index],
            }
        });

        dialogRef.afterClosed()
        .subscribe(data => {
            if (typeof data !== "undefined" && data != null && data) {
                this.list[index] = data.surgery;
                this.dataSource = new MatTableDataSource(this.list)
                this.surgeryTable.emit({data:this.list});
                this.surgery = new CardiologySurgicalHistoryBase();
                this.surgeryAgo = null;
                this.onSurgeryFocus()
            }
        }) 
        return dialogRef;  
      
    }
    onAddSurgery() {

        // @ is empty 
        if (this.surgery.what === null && this.surgery.when === null && this.surgery.note === null)
            return

        this.list.push(this.surgery);
        console.log(this.list)
        this.dataSource = new MatTableDataSource(this.list)
        this.surgeryTable.emit({data:this.list});
        this.surgery = new CardiologySurgicalHistoryBase();
        this.surgeryWhatInput.list=[];
        this.surgeryAgo = null;
        this.onSurgeryFocus()
    }

    onSurgeryDateChange(value) {
        let _value = value.target ? value.target.value : value;


        if (moment(_value).isValid() === true) {
            const date = moment(_value).format("MM-DD-YYYY")
            const now = moment().format("MM-DD-YYYY")
            const df = AppUtils.dateDifferenceOptimized(date, now);
            if (df.years > 0)
                this.surgeryAgo = +df.years
        }

    }

    onSurgeryAgoChange(value: number) {
        const date = moment().subtract(value, 'years')
        this.surgery.when = date["_d"]
    }

    onSurgeryFocus() {
        setTimeout(() => {
            this.surgeryWhatInput.input.nativeElement.focus();
        }, 100);
    }

}
