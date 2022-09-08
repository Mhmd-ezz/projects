
import { fromEvent as observableFromEvent, BehaviorSubject } from 'rxjs';

import { map, auditTime } from 'rxjs/operators';
import { Injectable, Inject } from '@angular/core';
import { WindowSize } from '../interface/window-size';

@Injectable()
export class ResizeService {

    constructor(@Inject('windowObject') private window: Window) {

        observableFromEvent(window, 'resize').pipe(
            auditTime(1000),
            map(event => <WindowSize>{
                width: event['currentTarget']['innerWidth'],
                height: event['currentTarget']['innerHeight']
            }))
            .subscribe((windowSize) => {
                this.windowSizeChanged.next(windowSize);
            })
    };

    readonly windowSizeChanged = new BehaviorSubject<WindowSize>(<WindowSize>{
        width: this.window.innerWidth,
        height: this.window.innerHeight
    });

}