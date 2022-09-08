import { PatientsMediaFilesDataSource } from './patientsMediaFiles.datasource';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatRippleModule } from '@angular/material/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseSidebarModule } from '@fuse/components';
import { AngularSplitModule } from 'angular-split';
import { NgxFlowModule, FlowInjectionToken } from '@flowjs/ngx-flow';
import Flow from '@flowjs/flow.js';

import { AttachFilesDialogComponent } from './attach-files-dialog/attach-files-dialog.component';
import { SharedUIModule } from '../blocks/common/shared-ui.module';
import { SharedMaterialModule } from 'app/blocks/common/shared-material.module';
import { FileManagerComponent } from './file-manager.component';
import { FileManagerService } from 'app/file-manager/file-manager.service';
import { FileManagerFileListComponent } from './file-list/file-list.component';
import { FileManagerMainSidebarComponent } from './sidebars/main/main.component';
import { FileManagerDetailsSidebarComponent } from './sidebars/details/details.component';
import { UploadSidePopupComponent } from 'app/file-manager/upload-side-popup/upload-side-popup.component';
import { MdcDirectivesModule } from 'app/blocks/directives/directives-module';
import { DeleteMediaFileSheetComponent } from './delete-media-file.component';

const routes: Routes = [
    {
        path: '**',
        component: FileManagerComponent,
        children: [],
        resolve: {
            files: FileManagerService
        }
    }
];

@NgModule({
    declarations: [
        FileManagerComponent,
        FileManagerFileListComponent,
        FileManagerMainSidebarComponent,
        FileManagerDetailsSidebarComponent,
        AttachFilesDialogComponent,
        UploadSidePopupComponent,
        DeleteMediaFileSheetComponent,

    ],
    imports: [
        RouterModule.forChild(routes),

        MatButtonModule,
        MatIconModule,
        MatRippleModule,
        MatSlideToggleModule,
        MatTableModule,

        FuseSharedModule,
        SharedUIModule,
        SharedMaterialModule,
        FuseSidebarModule,
        MdcDirectivesModule,


        AngularSplitModule.forRoot(),
        NgxFlowModule,
        // PdfViewerModule
    ],
    providers: [
        FileManagerService,
        PatientsMediaFilesDataSource,
        {
            provide: FlowInjectionToken,
            useValue: Flow
        }
    ],
    entryComponents: [AttachFilesDialogComponent, DeleteMediaFileSheetComponent]
})
export class FileManagerModule {
}
