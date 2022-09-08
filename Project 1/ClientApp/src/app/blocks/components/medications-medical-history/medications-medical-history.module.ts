import {  MedicationCardMedicalHistoryComponent } from './medication-card-medical-history/medication-card-medical-history.component';
import {  MedicationsMedicalHistoryComponent } from './medications-medical-history.component';
import Flow from '@flowjs/flow.js';
import { NgModule } from '@angular/core';
import { FuseSharedModule } from '@fuse/shared.module';
import { MdcDirectivesModule } from 'app/blocks/directives/directives-module';
import { SharedMaterialModule } from 'app/blocks/common/shared-material.module';

@NgModule({
    imports: [
        FuseSharedModule,
        MdcDirectivesModule,
        SharedMaterialModule,
    ],
  
    declarations: [
        MedicationsMedicalHistoryComponent,
        MedicationCardMedicalHistoryComponent
    ],
    exports: [
        MedicationCardMedicalHistoryComponent
    ]
})
export class MedicationsMedicalHistoryModule { }
