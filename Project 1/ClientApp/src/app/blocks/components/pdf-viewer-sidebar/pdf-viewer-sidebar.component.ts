import { Component, OnInit, OnDestroy } from '@angular/core';
import { PdfViewerSidebarService } from './pdf-viewer-sidebar.service';

@Component({
    selector: 'pdf-viewer-sidebar',
    templateUrl: './pdf-viewer-sidebar.component.html',
    styleUrls: ['./pdf-viewer-sidebar.component.scss'],
})
export class PdfViewerSidebarComponent implements OnInit {

    public pdfSrc;

    constructor(
        private _pdfViewerSideBarService: PdfViewerSidebarService
    ) {

    }

    ngOnInit() {

        this._pdfViewerSideBarService.onPdfSrcChanged.subscribe(file => {
            this.pdfSrc = file.url || file.filePath || file.path
        })

    }

}
