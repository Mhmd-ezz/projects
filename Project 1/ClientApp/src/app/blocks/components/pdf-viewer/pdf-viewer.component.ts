import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'app-pdf-viewer',
    templateUrl: './pdf-viewer.component.html',
    styleUrls: ['./pdf-viewer.component.scss'],
})
export class PdfViewerComponent implements OnInit {

    public pdfSrc;
    public viewerLoaded = false;
    public viewerEnabled = true;
    public src = null;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        public dialogRef: MatDialogRef<PdfViewerComponent>,
        private sanitizer: DomSanitizer
    ) {
        const url = data && data.url ? data.url : null;
http://presales-etgs.com/assets/web/INV5890.pdf
        if (url) {
            const joinUrl = `https://drive.google.com/viewerng/viewer?embedded=true&url=${url}#toolbar=0&scrollbar=0`
            setTimeout(() => {
                this.src = this.sanitizer.bypassSecurityTrustResourceUrl(joinUrl)
            }, 1);
        }
    }

    ngOnInit() {
    }

    public onCancelClick(): void {
        // this.dialogRef.close();
    }

    public onload() {
        setTimeout(() => {
            this.viewerLoaded = true;
        }, 1);
    }

    public onerror() {
        this.viewerLoaded = true;
    }

    public reloadViewer() {
        this.viewerLoaded = false;
        this.viewerEnabled = false;
        setTimeout(() => {
            this.viewerEnabled = true;
        }, 400);
    }

    public closeDialog() {
        this.dialogRef.close();
    }
}

