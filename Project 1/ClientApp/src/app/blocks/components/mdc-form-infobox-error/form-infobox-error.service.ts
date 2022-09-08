import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class FormInfoboxErrorService {

    public errors$: Subject<any[]> = new Subject<any[]>();


    constructor() { }

    reset() {
        this.errors$.next([])
    }
    
}
