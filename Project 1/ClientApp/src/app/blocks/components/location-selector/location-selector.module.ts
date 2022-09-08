import { MdcDirectivesModule } from './../../directives/directives-module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocationSelectorComponent } from './location-selector.component';
import { FuseSharedModule } from '@fuse/shared.module';
import { SharedMaterialModule } from 'app/blocks/common/shared-material.module';

@NgModule({
    imports: [
        FuseSharedModule,
        SharedMaterialModule,
        MdcDirectivesModule
    ],
    declarations: [LocationSelectorComponent],
    exports: [LocationSelectorComponent]
})
export class LocationSelectorModule { }
