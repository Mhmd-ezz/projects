import { MedicationFormDialogComponent } from './medication-form-dialog.component';
import Flow from '@flowjs/flow.js';
import { NgModule } from '@angular/core';
import { FuseSharedModule } from '@fuse/shared.module';
import { MdcDirectivesModule } from 'app/blocks/directives/directives-module';
import { SharedMaterialModule } from 'app/blocks/common/shared-material.module';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { MdcDrugInputDialogComponent } from 'app/blocks/components/mdc-drug-input-dialog/mdc-drug-input-dialog.component';

@NgModule({
    imports: [
        FuseSharedModule,
        MdcDirectivesModule,
        SharedMaterialModule,
        FontAwesomeModule
    ],
    entryComponents:[
        MedicationFormDialogComponent,
        MdcDrugInputDialogComponent
    ],
    declarations: [
        MedicationFormDialogComponent,
        MdcDrugInputDialogComponent
    ],
    exports: [
        MedicationFormDialogComponent
    ]
})
export class MedicationFormDialogModule { }
