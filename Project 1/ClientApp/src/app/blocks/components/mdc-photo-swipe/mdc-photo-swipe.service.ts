import { Injectable } from '@angular/core';
import { MdcPhotoSwipeModule } from './mdc-photo-swipe.module';
import { IImage } from 'app/blocks/interface/IImage';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class MdcPhotoSwipeService {

    public open$ = new Subject<{ images: IImage[], index: number }>();

    constructor() { }

    open(images: IImage[], index) {
        this.open$.next({ images, index })
    }
}
