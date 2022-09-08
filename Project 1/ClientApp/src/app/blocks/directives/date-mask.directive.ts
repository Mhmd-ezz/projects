import { Directive, OnDestroy, ElementRef } from '@angular/core';
import * as textMask from "vanilla-text-mask/dist/vanillaTextMask.js";
import createAutoCorrectedDatePipe from 'text-mask-addons/dist/createAutoCorrectedDatePipe';

@Directive({
    selector: '[appMaskDate]'
})
export class MaskDateDirective implements OnDestroy {

    // mask = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]; // dd/mm/yyyy
    mask = [/\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/]; // yyyy/mm/dd
    maskedInputController;

    constructor(private element: ElementRef) {
        const autoCorrectedDatePipe = createAutoCorrectedDatePipe('yyyy-mm-dd')

        this.maskedInputController = textMask.maskInput({
            inputElement: this.element.nativeElement,
            mask: this.mask,
            pipe: autoCorrectedDatePipe
        });
    }

    ngOnDestroy() {
        this.maskedInputController.destroy();
    }

}