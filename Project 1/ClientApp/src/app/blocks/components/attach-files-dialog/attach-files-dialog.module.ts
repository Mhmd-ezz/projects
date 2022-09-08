import { MdcPipesModule } from './../../pipes/pipes.module';
import { MdcLookupInputModule } from './../mdc-lookup-input/mdc-lookup-input.module';
import { FuseSharedModule } from './../../../../@fuse/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AttachFilesDialogComponent } from './attach-files-dialog.component';
import { SharedMaterialModule } from 'app/blocks/common/shared-material.module';
import { SharedUIModule } from 'app/blocks/common/shared-ui.module';
import { MdcDirectivesModule } from 'app/blocks/directives/directives-module';
import { MdcSearchPatientModule } from '../mdc-search-patient/mdc-search-patient.module';

@NgModule({
    declarations: [
        AttachFilesDialogComponent
    ],
    imports: [
        FuseSharedModule,
        MdcDirectivesModule,
        MdcPipesModule,
        SharedMaterialModule,
        MdcSearchPatientModule,
        MdcLookupInputModule,
    ],
    entryComponents: [
        AttachFilesDialogComponent
    ],
    exports: [
        AttachFilesDialogComponent
    ]
})
export class AttachFilesDialogModule { }
