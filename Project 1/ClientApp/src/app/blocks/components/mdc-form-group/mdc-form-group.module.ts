import { MdcFormGroupComponent } from 'app/blocks/components/mdc-form-group/mdc-form-group.component';
import { NgModule } from '@angular/core';

import { FuseSharedModule } from '@fuse/shared.module';
import { SharedMaterialModule } from '../../common/shared-material.module';


@NgModule({
    declarations: [
        MdcFormGroupComponent
    ],
    imports     : [
        SharedMaterialModule,
        FuseSharedModule
    ],
    exports     : [
        MdcFormGroupComponent
    ]
})
export class MdcFormGroupModule
{
}
