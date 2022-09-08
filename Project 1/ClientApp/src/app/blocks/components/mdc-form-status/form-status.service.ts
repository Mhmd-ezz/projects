import { FormStatusEnum } from './form-status.enum';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class FormStatusService {

    public formStatus$: Subject<FormStatusEnum> = new Subject<FormStatusEnum>();

    constructor() { }

    reset(){
        this.formStatus$.next(null)
    }

}
