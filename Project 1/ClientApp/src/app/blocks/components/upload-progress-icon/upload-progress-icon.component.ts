import { Component, OnInit } from '@angular/core';
import { QueueFileUploaderService } from '../queue-file-uploader/queue-file-uploader.service';

@Component({
    selector: 'app-upload-progress-icon',
    templateUrl: './upload-progress-icon.component.html',
    styleUrls: ['./upload-progress-icon.component.scss']
})
export class UploadProgressIconComponent implements OnInit {

    count: number = 0;
    hidden: boolean = true;

    constructor(
        private _queueFileUploaderService: QueueFileUploaderService
    ) { }

    ngOnInit() {

        this._queueFileUploaderService.files$.subscribe(data => {
            
            if (data.length) {
                this.count = data.length;
                this.hidden = false
            } else {
                this.count = 0;
                this.hidden = true
            }
        })
    }
}
