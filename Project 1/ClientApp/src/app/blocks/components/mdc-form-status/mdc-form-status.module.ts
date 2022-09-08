import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdcFormStatusComponent } from './mdc-form-status.component';
import { SharedMaterialModule } from 'app/blocks/common/shared-material.module';

@NgModule({
    declarations: [
        MdcFormStatusComponent
    ],
    imports: [
        CommonModule,
        SharedMaterialModule,
    ],
    exports: [
        MdcFormStatusComponent
    ]
})
export class MdcFormStatusModule { }
