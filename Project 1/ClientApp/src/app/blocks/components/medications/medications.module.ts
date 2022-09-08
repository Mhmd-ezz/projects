import { MedicationCardComponent } from './medication-card/medication-card.component';
import { MedicationsComponent } from './medications.component';
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
        MedicationsComponent,
        MedicationCardComponent
    ],
    exports: [
        MedicationsComponent
    ]
})
export class MedicationsModule { }
