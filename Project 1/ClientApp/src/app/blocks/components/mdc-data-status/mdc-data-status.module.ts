import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdcDataStatusComponent } from './mdc-data-status.component';
import { SharedMaterialModule } from 'app/blocks/common/shared-material.module';

@NgModule({
    declarations: [
        MdcDataStatusComponent
    ],
    imports: [
        CommonModule,
        SharedMaterialModule,
    ],
    exports: [
        MdcDataStatusComponent
    ]
})
export class MdcDataStatusModule { }
