import Flow from '@flowjs/flow.js';
import { NgModule } from '@angular/core';
import { MediaFileListComponent } from './media-file-list.component';
import { FuseSharedModule } from '@fuse/shared.module';
import { MdcDirectivesModule } from 'app/blocks/directives/directives-module';
import { SharedMaterialModule } from 'app/blocks/common/shared-material.module';
import { DragScrollModule } from 'ngx-drag-scroll';
import { NgxFlowModule, FlowInjectionToken } from '@flowjs/ngx-flow';
import { ImgFallbackModule } from 'ngx-img-fallback';


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
        MediaFileListComponent
    ],
    exports: [
        MediaFileListComponent
    ]
})
export class MediaFileListModule { }
