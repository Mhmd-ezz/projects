import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import * as PhotoSwipe from 'photoswipe';
import  PhotoSwipeUI_Default from 'photoswipe/dist/photoswipe-ui-default';
import { IImage } from 'app/blocks/interface/IImage';
import { MdcPhotoSwipeService } from './mdc-photo-swipe.service';


@Component({
    selector: 'mdc-photo-swipe',
    templateUrl: './mdc-photo-swipe.component.html',
    styleUrls: ['./mdc-photo-swipe.component.scss']
})
export class MdcPhotoSwipeComponent implements OnInit {

    @ViewChild('photoSwipe', { static: false }) photoSwipe: ElementRef;

    constructor(
        private _photoSwipe: MdcPhotoSwipeService
    ) { }

    ngOnInit() {

        this._photoSwipe.open$
            .subscribe(result => {
                this.openGallery(result.images, result.index)
            })
    }

    openGallery(images: IImage[], index: number) {
        // Build gallery images array
        images = images || [];

        // define options (if needed)
        const options = {
            index: index || 0, // start at first slide
            zoomEl: true,
            loop: false,
            fullscreenEl: true,
            shareEl: true,
            shareButtons: [
                { id: 'download', label: 'Download', url: '{{raw_image_url}}', download: true }
            ],
        };

        // Initializes and opens PhotoSwipe
        const gallery = new PhotoSwipe(this.photoSwipe.nativeElement, PhotoSwipeUI_Default, images, options);

        try {

            // @ https://github.com/dimsemenov/PhotoSwipe/issues/741#issuecomment-463694294
            gallery.listen('imageLoadComplete', function (instance, item) {
                if (item.h < 1 || item.w < 1) {

                    let img = new Image()
                    img.onload = () => {
                        item.w = img.width
                        item.h = img.height
                        // gallery.invalidateCurrItems()
                        gallery.updateSize(true)
                    }
                    img.src = item.src
                }

            });
        } catch (err) {
            console.error(err)
        }


        gallery.init();
    }


}
