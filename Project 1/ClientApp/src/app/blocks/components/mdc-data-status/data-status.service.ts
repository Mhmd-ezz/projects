import { DataStatusEnum } from './data-status.enum';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class DataStatusService {

    public dataStatus$: Subject<DataStatusEnum> = new Subject<DataStatusEnum>();

    constructor() { }

    reset(){
        this.dataStatus$.next(null)
    }

}
