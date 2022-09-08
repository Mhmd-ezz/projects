import { SharedMaterialModule } from './../../common/shared-material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadProgressIconComponent } from './upload-progress-icon.component';

@NgModule({
    imports: [
        CommonModule,
        SharedMaterialModule,
    ],
    declarations: [UploadProgressIconComponent],
    exports: [UploadProgressIconComponent]
})
export class UploadProgressIconModule { }
