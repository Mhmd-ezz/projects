import { DataStatusService } from './data-status.service';
import { Component, OnInit, Input } from '@angular/core';
import { DataStatusEnum } from './data-status.enum';
import { Observable } from 'rxjs';

@Component({
    selector: 'mdc-data-status',
    templateUrl: './mdc-data-status.component.html',
    styleUrls: ['./mdc-data-status.component.scss']
})
export class MdcDataStatusComponent implements OnInit {

   
    status$: Observable<any>
    public dataStatusEnum: typeof DataStatusEnum = DataStatusEnum;

    constructor(
        private _dataStatusService: DataStatusService
    ) {
        _dataStatusService.reset()
    }

    ngOnInit() {      
        this.status$ = this._dataStatusService.dataStatus$  
    }

}
