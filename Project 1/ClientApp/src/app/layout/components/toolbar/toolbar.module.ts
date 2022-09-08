import { AppointmentDialogModule } from './../../../blocks/components/appointment-dialog/appointment-dialog.module';
import { MdcFuseSearchBarModule } from './../../../blocks/components/mdc-search-bar/mdc-search-bar.module';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FuseSearchBarModule, FuseShortcutsModule } from '@fuse/components';
import { FuseSharedModule } from '@fuse/shared.module';

import { ToolbarComponent } from 'app/layout/components/toolbar/toolbar.component';
import { UploadProgressIconModule } from 'app/blocks/components/upload-progress-icon/upload-progress-icon.module';
import { NotificationsModule } from '../notifications/notifications.module';

@NgModule({
    declarations: [
        ToolbarComponent
    ],
    imports     : [
        RouterModule,
        MatButtonModule,
        MatIconModule,
        MatMenuModule,
        MatToolbarModule,
NotificationsModule,
        FuseSharedModule,
        FuseSearchBarModule,
        FuseShortcutsModule,
        MdcFuseSearchBarModule,
        AppointmentDialogModule,
        UploadProgressIconModule
    ],
    exports     : [
        ToolbarComponent
    ]
})
export class ToolbarModule
{
}
