import { PdfViewerSidebarService } from 'app/blocks/components/pdf-viewer-sidebar/pdf-viewer-sidebar.service';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PdfViewerSidebarComponent } from './pdf-viewer-sidebar.component';
// import { PdfViewerModule } from 'ng2-pdf-viewer';
import { FuseSidebarModule } from '@fuse/components';

@NgModule({
  imports: [
    CommonModule,
    // PdfViewerModule,
    FuseSidebarModule,
  ],
  declarations: [PdfViewerSidebarComponent],
  exports: [PdfViewerSidebarComponent],
})
export class PdfViewerSidebarModule {
    static forRoot(): ModuleWithProviders<PdfViewerSidebarModule> {
        return {
            ngModule: PdfViewerSidebarModule,
            providers: [
                PdfViewerSidebarService
            ]
        };
    }
 }
