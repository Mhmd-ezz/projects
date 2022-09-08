import { Flow } from '@flowjs/flow.js';
import { FuseSharedModule } from '../../../../@fuse/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedMaterialModule } from 'app/blocks/common/shared-material.module';
import { MdcDirectivesModule } from 'app/blocks/directives/directives-module';
import { MdcLookupInputAdvancedComponent } from './mdc-lookup-input-advnaced.component';
import { NgxFlowModule, FlowInjectionToken } from '@flowjs/ngx-flow';
import { LookupsStoreService } from 'app/blocks/graphql/store/lookupsStore.service';
import { LookupsService } from 'app/settings/lookups/lookups.service';
import { NgxTrimDirectiveModule } from 'ngx-trim-directive';
import { NgxLowerCaseDirectiveModule } from 'ngx-lower-case-directive';

@NgModule({
    declarations: [
        MdcLookupInputAdvancedComponent
    ],
    imports: [
        FuseSharedModule,
        MdcDirectivesModule,
        SharedMaterialModule,
        NgxFlowModule,
        NgxTrimDirectiveModule,
        NgxLowerCaseDirectiveModule,
    ],
    entryComponents: [
    ],
    providers: [
        LookupsStoreService,
        LookupsService,
        {
            provide: FlowInjectionToken,
            useValue: Flow
        },
    ],
    exports: [
        MdcLookupInputAdvancedComponent
    ]
})
export class MdcLookupInputAdvancedModule { }
