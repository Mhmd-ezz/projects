import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConditionSelectorComponent } from './condition-selector.component';
import { FuseSharedModule } from '@fuse/shared.module';
import { SharedMaterialModule } from 'app/blocks/common/shared-material.module';

@NgModule({
    imports: [
        FuseSharedModule,
        SharedMaterialModule,
    ],
    declarations: [ConditionSelectorComponent],
    exports: [ConditionSelectorComponent]
})
export class ConditionSelectorModule { }
