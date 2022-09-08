import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';

// @Injectable({
//     providedIn: 'root'
// })
export class PdfViewerSidebarService {

    public onPdfSrcChanged: Subject<any>;
    instance = Math.random()
    constructor(
        private _fuseSidebarService: FuseSidebarService,
    ) {
        this.onPdfSrcChanged = new Subject();
    }

    openPdf(file) {
        // @ open sidebar
        this._fuseSidebarService.getSidebar('pdf-viewer-sidebar').toggleOpen();

        // @ Notify pdfViewer with new file source
        this.onPdfSrcChanged.next(file);
    }
}
