import { MedicationFormDialogService } from './../../medication-form-dialog/medication-form-dialog.service';
import { Component, OnInit,Input } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { Medication } from 'app/fake-db/medication.model';

@Component({
    selector: 'app-medication-card',
    templateUrl: './medication-card.component.html',
    styleUrls: ['./medication-card.component.scss'],
    animations: fuseAnimations

})
export class MedicationCardComponent implements OnInit {

    public showHistory = false;
    @Input('conditionId') public conditionId:string;
    @Input('followupId') public followupId:string;
    @Input('medications') public medications:Medication;
    totalHistory:number;
    constructor(
        private _medicationFormDialogService: MedicationFormDialogService,
    ) { }

    ngOnInit() {     
        //console.log('medications',this.medications)  
        this.totalHistory=this.medications.history.length;    
      
    }

    renew() {     
        this._medicationFormDialogService.openDialog({ action: "renew",medication:this.medications,conditionId:this.conditionId,followupId:this.followupId})
    }

    stop() {
        this._medicationFormDialogService.openDialog({ action: "stop",medication:this.medications})
    }

    replace() {
     this._medicationFormDialogService.openDialog({ action: "replace",medication:this.medications,conditionId:this.conditionId,followupId:this.followupId})
    }

}
