import { Injectable } from '@angular/core';
import { Observable, fromEvent, merge, of } from 'rxjs';
import { mapTo } from 'rxjs/operators';

@Injectable()
export class InternetConnectionService {
    private online$: Observable<boolean>;
    
    constructor() {
        this.online$ = merge(
            of(navigator.onLine),
            fromEvent(window, 'online').pipe(mapTo(true)),
            fromEvent(window, 'offline').pipe(mapTo(false))
          );
     }

     isConnected(){
        //  console.log(this.online$)
         return this.online$;
     }
     

}
