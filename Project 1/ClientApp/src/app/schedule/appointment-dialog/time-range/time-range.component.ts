import { Appointment } from 'app/blocks/graphql/generated/gqlServices';
import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
    selector: 'app-time-range',
    templateUrl: './time-range.component.html',
    styleUrls: ['./time-range.component.scss'],
    encapsulation: ViewEncapsulation.None,
    viewProviders: [{ provide: ControlContainer, useExisting: NgForm }]
})
export class TimeRangeComponent implements OnInit {

    @Input() event: Appointment = {};
    timeZoneTemplate = false;
    allDayActive = false;

    constructor() {
    }

    ngOnInit() {
    }

    // --------------------------------------------------------------------
    //  @ Public Method
    // --------------------------------------------------------------------

    onAlldayChange(event: MatCheckboxChange) {
        if (event.checked) {
            this.allDayActive = true;
        } else {
            this.allDayActive = false;
        }
    }

    toggleTimeZoneTemplate() {
        this.timeZoneTemplate = !this.timeZoneTemplate;
    }
}
