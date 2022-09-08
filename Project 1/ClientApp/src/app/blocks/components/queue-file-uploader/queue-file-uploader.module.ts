import { SharedUIModule } from 'app/blocks/common/shared-ui.module';
import { NgModule } from '@angular/core';
import { QueueFileUploaderComponent } from './queue-file-uploader.component';
import { FuseSharedModule } from '@fuse/shared.module';
import { SharedMaterialModule } from 'app/blocks/common/shared-material.module';
import { NgxFlowModule, FlowInjectionToken } from '@flowjs/ngx-flow';
import Flow from '@flowjs/flow.js';
import { MatProgressBarModule } from '@angular/material/progress-bar';


@NgModule({
    imports: [
        FuseSharedModule,
        SharedMaterialModule,
        MatProgressBarModule,
        NgxFlowModule,
        SharedUIModule

    ],
    providers: [
        {
            provide: FlowInjectionToken,
            useValue: Flow
        }
    ],
    declarations: [QueueFileUploaderComponent],
    exports: [QueueFileUploaderComponent]
})
export class QueueFileUploaderModule { }
