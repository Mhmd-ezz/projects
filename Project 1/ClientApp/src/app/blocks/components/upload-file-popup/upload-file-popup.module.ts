import { SharedMaterialModule } from 'app/blocks/common/shared-material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadFilePopupComponent } from './upload-file-popup.component';
import { FuseSharedModule } from '@fuse/shared.module';

@NgModule({
    declarations: [UploadFilePopupComponent],
    imports: [
        FuseSharedModule,
        SharedMaterialModule,
    ],
    exports:[UploadFilePopupComponent]
})
export class UploadFilePopupModule { }
