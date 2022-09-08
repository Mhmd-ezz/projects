import { Flow } from '@flowjs/flow.js';
import { FuseSharedModule } from '../../../../@fuse/shared.module';
import { NgModule } from '@angular/core';
import { SharedMaterialModule } from 'app/blocks/common/shared-material.module';
import { MdcDirectivesModule } from 'app/blocks/directives/directives-module';
import { NgxFlowModule, FlowInjectionToken } from '@flowjs/ngx-flow';
import { LookupsStoreService } from 'app/blocks/graphql/store/lookupsStore.service';
import { LookupsService } from 'app/settings/lookups/lookups.service';
import { MdcLookupInputAdvancedPredefinedComponent } from './mdc-lookup-input-advanced-predefined.component';
import { MyPosition } from './my-position.directive';

@NgModule({
   declarations: [
      MdcLookupInputAdvancedPredefinedComponent,
      MyPosition
   ],
   imports: [
      FuseSharedModule,
      MdcDirectivesModule,
      SharedMaterialModule,
      NgxFlowModule
   ],
   entryComponents: [],
   providers: [
      LookupsStoreService,
      LookupsService,
   ],
   exports: [
      MdcLookupInputAdvancedPredefinedComponent
   ]
})
export class MdcLookupInputAdvancedPredefinedModule { }
