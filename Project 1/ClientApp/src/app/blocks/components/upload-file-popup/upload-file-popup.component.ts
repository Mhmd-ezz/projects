import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { FlowDirective, Transfer } from '@flowjs/ngx-flow';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'upload-file-popup',
    templateUrl: './upload-file-popup.component.html',
    styleUrls: ['./upload-file-popup.component.scss']
})
export class UploadFilePopupComponent implements OnInit {

    // Private
    private _unsubscribeAll: Subject<any>;

    public isCollapsed: boolean = false;
    public isHovering: any = {}

    private _flow: FlowDirective;
    @Input() public isOpened: boolean = false;
    @Output() public onClose = new EventEmitter();

    @Input()
    set flow(value: FlowDirective) {
        this._flow = value;
    }
    get flow() {
        return this._flow;
    }


    constructor() {
        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    ngOnInit() {

        this.flow
            .somethingToUpload$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(something => {
                if (something && this.isOpened) {
                    this.flow.upload();
                }
            })
    }

    /**
    * On destroy
    */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // ------------------------------------------------------------
    //      Public Methods
    // ------------------------------------------------------------

    trackTransfer(transfer: Transfer) {
        return transfer.id;
    }

    upload() {

    }

    close() {
        this.flow.cancel();
        this.onClose.emit(true);
    }

}
