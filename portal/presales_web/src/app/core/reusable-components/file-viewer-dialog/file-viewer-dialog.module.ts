import { MatIconModule } from '@angular/material/icon';
import { NgModule } from '@angular/core';
import {MatDialogModule} from '@angular/material/dialog';
import { NgxDocViewerModule } from 'ngx-doc-viewer';
import { FileViewerDialogComponent } from './file-viewer-dialog.component';


@NgModule({
  declarations: [
    FileViewerDialogComponent
  ],
  imports: [
    MatDialogModule,
    NgxDocViewerModule,
    MatIconModule
  ]
})
export class FileViewerDialogModule { }
