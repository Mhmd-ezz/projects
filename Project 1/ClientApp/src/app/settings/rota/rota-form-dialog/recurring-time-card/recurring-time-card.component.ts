import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { InPlaceEditorComponent } from '@syncfusion/ej2-angular-inplace-editor';
import { TimePickerModel } from '@syncfusion/ej2-calendars';
import { Recurrence } from 'app/blocks/graphql/generated/gqlServices';

@Component({
    selector: 'app-recurring-time-card',
    templateUrl: './recurring-time-card.component.html',
    styleUrls: ['./recurring-time-card.component.scss']
})
export class RecurringTimeCardComponent implements OnInit {

    @Input() recurrence: Recurrence[];

    @ViewChild('timePickerEle', { static: false })
    public timePickerObj: InPlaceEditorComponent;

    public timeValue: Date = new Date();

    public timePickerModel: TimePickerModel = {
        placeholder: 'Select a time',
    };

    constructor() { }

    ngOnInit() {
    }

    //--------------------------------------------------------------------
    //  Public methods
    //--------------------------------------------------------------------   

    onStartTimeChange({ value }, i) {
        this.recurrence[i].startTime = new Date(value)
    }

    onEndTimeChange({ value }, i) {
        this.recurrence[i].endTime = new Date(value)
    }

    onRruleChange(event, i) {
        this.recurrence[i].rule = event;
    }

    deleteRule(i) {
        this.recurrence.splice(i, 1);
    }

}
