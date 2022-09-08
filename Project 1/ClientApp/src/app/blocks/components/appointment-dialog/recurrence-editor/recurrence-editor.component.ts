import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-recurrence-editor',
    templateUrl: './recurrence-editor.component.html',
    styleUrls: ['./recurrence-editor.component.scss']
})
export class RecurrenceEditorComponent implements OnInit {

    value: string;

    @Input() set data(value) {
        this.value = value;
    };

    @Output() change: EventEmitter<string> = new EventEmitter<string>();

    constructor( ) { }

    ngOnInit() {
    }


    onRecurrenceSelectorChange(event){
        this.change.emit(event)
    }
}
