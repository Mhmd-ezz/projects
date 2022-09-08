import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewEditPatientDialogComponent } from './new-edit-patient-dialog.component';
import { FuseSharedModule } from '@fuse/shared.module';
import { SharedMaterialModule } from 'app/blocks/common/shared-material.module';
import { MdcDirectivesModule } from 'app/blocks/directives/directives-module';
import { NgxTrimDirectiveModule } from 'ngx-trim-directive';
import { NgxLowerCaseDirectiveModule } from 'ngx-lower-case-directive';

@NgModule({
    imports: [
        FuseSharedModule,
        SharedMaterialModule,
        MdcDirectivesModule,
        NgxTrimDirectiveModule,
        NgxLowerCaseDirectiveModule,
    ],
    declarations: [NewEditPatientDialogComponent],
    entryComponents: [NewEditPatientDialogComponent]
})
export class NewEditPatientDialogModule { }
