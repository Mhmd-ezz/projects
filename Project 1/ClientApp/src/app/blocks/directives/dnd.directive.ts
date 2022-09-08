import { Directive, HostListener, HostBinding } from '@angular/core';

@Directive({
    selector: '[appDnd]'
})

// @ Drop and drag files style
export class DndDirective {

    @HostBinding('style.background') private background = '#fff';
    @HostBinding('style.border-top') private borderTop = '1px solid #d5d4d4';
    @HostBinding('style.border-bottom') private borderBottom = '1px solid #d5d4d4';
    @HostBinding('style.border-right') private borderRight = '1px solid #d5d4d4';
    @HostBinding('style.border-left') private borderLeft = '1px solid #d5d4d4';

    constructor() { }

    @HostListener('dragover', ['$event']) public onDragOver(evt) {
        evt.preventDefault();
        evt.stopPropagation();
        this.background = '#ddf0fa';
        this.borderTop = '2px solid #40c8f2'
        this.borderBottom = '2px solid #40c8f2'
        this.borderRight = '2px solid #40c8f2'
        this.borderLeft = '2px solid #40c8f2'
    }

    @HostListener('dragleave', ['$event']) public onDragLeave(evt) {
        evt.preventDefault();
        evt.stopPropagation();
        this.background = '#fff'
        this.borderTop = '1px solid #d5d4d4'
        this.borderBottom = '1px solid #d5d4d4';
        this.borderRight = '1px solid #d5d4d4';
        this.borderLeft = '1px solid #d5d4d4';
    }

    @HostListener('drop', ['$event']) public onDrop(evt) {
        evt.preventDefault();
        evt.stopPropagation();
        this.background = '#fff';
        this.borderTop = '1px solid #d5d4d4'
        this.borderBottom = '1px solid #d5d4d4';
        this.borderRight = '1px solid #d5d4d4';
        this.borderLeft = '1px solid #d5d4d4';
        let files = evt.dataTransfer.files;
        if (files.length > 0) {
        }
    }

}