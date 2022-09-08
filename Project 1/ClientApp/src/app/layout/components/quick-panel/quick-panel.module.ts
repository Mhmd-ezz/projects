import { NgModule } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule} from '@angular/material/list';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { FuseSharedModule } from '@fuse/shared.module';
import { QuickPanelComponent } from 'app/layout/components/quick-panel/quick-panel.component';
import { MatTabsModule } from '@angular/material/tabs';
import { QueueFileUploaderModule } from 'app/blocks/components/queue-file-uploader/queue-file-uploader.module';

@NgModule({
    declarations: [
        QuickPanelComponent
    ],
    imports: [
        MatDividerModule,
        MatListModule,
        MatSlideToggleModule,

        FuseSharedModule,
        MatTabsModule,
        MatIconModule,

        QueueFileUploaderModule,

    ],
    exports: [
        QuickPanelComponent
    ]
})
export class QuickPanelModule {
}
