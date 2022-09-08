import Flow from '@flowjs/flow.js';
import { NgModule } from '@angular/core';
import { FuseSharedModule } from '@fuse/shared.module';
import { MdcDirectivesModule } from 'app/blocks/directives/directives-module';
import { SharedMaterialModule } from 'app/blocks/common/shared-material.module';
import { DragScrollModule } from 'ngx-drag-scroll';
import { NgxFlowModule, FlowInjectionToken } from '@flowjs/ngx-flow';
import { ImgFallbackModule } from 'ngx-img-fallback';
import { MediaFileViewListComponent } from './media-file-view-list.component';


@NgModule({
    imports: [
        FuseSharedModule,
        MdcDirectivesModule,
        SharedMaterialModule,
        DragScrollModule,
        ImgFallbackModule,
        NgxFlowModule,


    ],
    providers: [
        {
            provide: FlowInjectionToken,
            useValue: Flow
        }
    ],
    declarations: [
        MediaFileViewListComponent
    ],
    exports: [
        MediaFileViewListComponent
    ]
})
export class MediaFileViewListModule { }
