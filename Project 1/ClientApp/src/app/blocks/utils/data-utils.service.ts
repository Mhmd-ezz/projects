
import { DataStatusService } from '../components/mdc-data-status/data-status.service';
import { Injectable } from '@angular/core';
import { AppState } from '@appStore/reducers';
import { Store } from '@ngrx/store';

import { DataStatusEnum } from '../components/mdc-data-status/data-status.enum';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
    providedIn: 'root'
})
export class DataUtilsService {

    public dataStatusEnum: typeof DataStatusEnum = DataStatusEnum;

    constructor(
        private _store: Store<AppState>,
        private snackBar: MatSnackBar,
        private _dataStatusService: DataStatusService,
        
    ) {
    } 

    public popup(message: string) {
        this.snackBar.open(message, 'CLOSE', {
            panelClass: 'm-24',
            duration: 4000
        });
    }


    public dataLocal() {
        this._dataStatusService.dataStatus$.next(this.dataStatusEnum.local)
    }
    public dataFromServer() {
        this._dataStatusService.dataStatus$.next(this.dataStatusEnum.server)
    }  
    public serverNotReachable() {
        this._dataStatusService.dataStatus$.next(this.dataStatusEnum.serverNotReachable)
    }  


}