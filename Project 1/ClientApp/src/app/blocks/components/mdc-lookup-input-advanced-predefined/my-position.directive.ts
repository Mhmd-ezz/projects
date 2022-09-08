import { Directive, OnInit, Input, ElementRef, Renderer2 } from '@angular/core';



@Directive({
    selector: '[myposition]',
    // host: {
    //     '[style.position]': '"absolute"',
    // }
})
export class MyPosition implements OnInit {
    @Input() myposition: any;
    @Input('my') myInput: string;
    @Input('at') atInput: string;
    @Input('offset') offsetInput: string;

    my: string[];
    at: string[]
    offset: string[];

    constructor(
        private element: ElementRef,
        private renderer: Renderer2
    ) { }

    ngOnInit(): void {

        if (this.myposition.nativeElement) {

            let top: number;
            let left: number;

            // Default inputs.
            if (!this.myInput) {
                this.myInput = 'top left';
            }
            if (!this.atInput) {
                this.atInput = 'top left';
            }
            if (!this.offsetInput) {
                this.offsetInput = '0 0';
            }

            this.my = this.myInput.split(' ');
            this.at = this.atInput.split(' ');
            this.offset = this.offsetInput.split(' ');

            // Get reference element position.
            let rect = this.myposition.nativeElement.getBoundingClientRect();

            console.log(rect)


            // Set new top/left values.
            left = rect.left + parseInt(this.offset[0]);
            top = rect.top + parseInt(this.offset[1]);

            // Adjust top/left values for on element position.
            if (this.at[0] === 'center') {
                left += rect.width / 2;
            }
            if (this.at[1] === 'center') {
                top += rect.height / 2;
            }

            // Position element.
            this.renderer.setStyle(this.element.nativeElement, 'top', top + 'px');
            this.renderer.setStyle(this.element.nativeElement, 'left', left + 'px');
        }
    }
}