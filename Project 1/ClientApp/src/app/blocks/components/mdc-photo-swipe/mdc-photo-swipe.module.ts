import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdcPhotoSwipeComponent } from './mdc-photo-swipe.component';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [MdcPhotoSwipeComponent],
    exports:[MdcPhotoSwipeComponent],
})
export class MdcPhotoSwipeModule { }
