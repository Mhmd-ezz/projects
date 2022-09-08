import {  DrugView } from 'app/blocks/graphql/generated/gqlServices';

export class Medication
{
    patientId: string;
    conditionId:string;
    followupId:string;
    medicationId:string;
    startTime:Date;
    endTime:Date;
//drug:DrugView;
    drug:{   
        atcCode: string;
        name: string;
        dosage: string;
        form: string;
        Route: string;
    };
    history:[
        {   startDate: Date;
            stopDate: Date;
            duration: string;
            frequency: string;
            status: string;
            note: string;
        }
    ];
    isActive: boolean;
    reason: string; 
    // status: { 
    //     isActive: boolean;
    //     reason: string; };

    /**
     * Constructor
     *
     * @param medication
     */
    constructor(medication: any=null)
    {
        {   medication = medication || {};
        this.startTime=medication.startTime || undefined;
        this.endTime=medication.endTime || undefined;
            this.medicationId = medication.medicationId || null;
            this.patientId = medication.patientId  || null;
            this.conditionId=medication.conditionId || null;
            this.followupId=medication.followupId || null;
            this.drug = medication.drug || {               
                name : null,
                dosage : null,
                form : null,
                Route : null,
                atcCode : null,
            }       
            this.history = [medication.history  || {
                startDate: null,
                stopDate: null,
                duration: null,
                frequency: null,
                status: null,
                note: null,
            }];
           this.isActive=medication.isActive;
           this.reason=medication.reason;
            // this.status=medication.isActive || {
            //     isActive:false,
            //     reason:null
            // }
      
        }
    }
}
