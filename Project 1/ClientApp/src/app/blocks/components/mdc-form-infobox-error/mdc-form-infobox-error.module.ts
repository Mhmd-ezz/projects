import { MdcFormInfoboxErrorComponent } from './mdc-form-infobox-error.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedMaterialModule } from 'app/blocks/common/shared-material.module';

@NgModule({
    declarations: [
        MdcFormInfoboxErrorComponent
    ],
    imports: [
        CommonModule,
        SharedMaterialModule,

    ],
    exports: [
        MdcFormInfoboxErrorComponent,
    ]
})
export class MdcFormInfoboxErrorModule {
}