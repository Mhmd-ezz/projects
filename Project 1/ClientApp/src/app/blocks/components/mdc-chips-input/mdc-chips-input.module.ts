import { SharedMaterialModule } from 'app/blocks/common/shared-material.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdcChipsInputComponent } from './mdc-chips-input.component';

@NgModule({
    imports: [
        FuseSharedModule,
        SharedMaterialModule
    ],
    declarations: [
        MdcChipsInputComponent
    ],
    exports: [
        MdcChipsInputComponent
    ]
})
export class MdcChipsInputModule { }
