import { FuseSharedModule } from './../../../../@fuse/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedMaterialModule } from 'app/blocks/common/shared-material.module';
import { MdcDirectivesModule } from 'app/blocks/directives/directives-module';
import { MdcLookupInputComponent } from './mdc-lookup-input.component';

@NgModule({
    declarations: [
        MdcLookupInputComponent
    ],
    imports: [
        FuseSharedModule,
        MdcDirectivesModule,
        SharedMaterialModule,
    ],
    entryComponents: [
    ],
    exports:[
        MdcLookupInputComponent
    ]
})
export class MdcLookupInputModule { }
