import { ViewChild } from '@angular/core';
import { Appointment } from 'app/blocks/graphql/generated/gqlServices';
import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { TimePickerComponent, ChangeEventArgs, ItemEventArgs } from '@syncfusion/ej2-angular-calendars';

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

    @ViewChild('startTime', { static: false })
    public startObject: TimePickerComponent;
    @ViewChild('endTime', { static: false })
    public endObject: TimePickerComponent;
    public isStartTimeChange: Boolean = true;
    public endInput: HTMLInputElement;
    public interval = 10;
    constructor() {
    }

    ngOnInit() {
    }

    ngAfterViewInit(): void {
    }

    // --------------------------------------------------------------------
    //  @ Public Method
    // --------------------------------------------------------------------

    onOpen(ev): void {
        // scrollTo value will be assigned only if the timepicker value is not null or undefined and is a valid value.
        if (this.startObject && this.startObject.value && !isNaN(+this.startObject.value)) {
        }
    }

    onEndTimeChange(event) {
        const startTime = new Date(this.startObject.value);
        const endTime = new Date(event.value);
        endTime.setMinutes(endTime.getMinutes());
        endTime.setHours(endTime.getHours());
        endTime.setDate(startTime.getDate());
        endTime.setMonth(startTime.getMonth());
        endTime.setFullYear(startTime.getFullYear());
        this.event.endTime = endTime;
    }

    onSimpleDateChange({ value }) {

        // @ Simple date selection contains one datePicker for startTime, so when startTime update date,month,year, for endTime
        if (value) {
            const startTime = new Date(value);
            const endTime = new Date(this.event.endTime);
            endTime.setMinutes(startTime.getMinutes() + 30);
            endTime.setHours(startTime.getHours());
            endTime.setDate(startTime.getDate());
            endTime.setMonth(startTime.getMonth());
            endTime.setFullYear(startTime.getFullYear());
            this.event.endTime = endTime;
        }
    }

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

    onEnableEndTime(args: ChangeEventArgs): void {

        /*Enables end time if start time is selected*/
        let value: Date;
        if (this.isStartTimeChange) {
            this.endObject.enabled = true;
            this.endObject.value = null;
            value = new Date(args.value);
            value.setMinutes(value.getMinutes() + this.endObject.step);
            this.endObject.min = value;
        } else {
            this.isStartTimeChange = true;
        }
    }

    onEndDateCreated(e) {
        setTimeout(() => {

            const startTime = new Date(this.event.startTime);
            const endTime = new Date(this.event.endTime);
            endTime.setMinutes(endTime.getMinutes());
            endTime.setHours(endTime.getHours());
            endTime.setDate(startTime.getDate());
            endTime.setMonth(startTime.getMonth());
            endTime.setFullYear(startTime.getFullYear());
            this.event.endTime = endTime;
        }, 1);
    }

    public itemRenderHandler(args: ItemEventArgs): void {

        setTimeout(() => {


            if (this.startObject.value == null) {
                return;
            }

            /*Enables end time if start time is selected*/
            // inner element declaration for text
            const span: HTMLElement = document.createElement('span');
            // if (args.value.getHours() === 0 && args.value.getMinutes() === 0 && args.value.getMinutes() === 0) {
            //     //assign the initial value to the variable
            //     // this.startObject.value = args.value;
            // }


            // get the minutes details
            const start = +new Date(this.startObject.value);

            // @ Bcs args.value always contains the date as today
            // @ So, always take the full date from args and change time according to startTime value
            const currentRendered = new Date(this.startObject.value);
           
            currentRendered.setHours(args.value.getHours());
            currentRendered.setMinutes(args.value.getMinutes());
            const minutes: number = (+currentRendered - start) / 60000;
           
            if (minutes <= 0) {
                args.isDisabled = true;
            }

            // get the hours details
            const hours: number = parseInt('' + (minutes / 60), 10);
           
            const mins = minutes - hours * 60;
            // let mins: number = (minutes % 60) / 6;
            
            // displayed text formation for each LI element.
            let minText: string;
            const minsText = ' mins';
            const hrsText = ' hrs';

            if (minutes === 0 || minutes === 30) {
                minText = minutes + minsText;
            } else {
                minText = mins + minsText;
               // minText = (mins > 0) ? ('.' + mins) : '';
                
            }
            span.innerHTML = '<span class="secondary-text"> (' + ((hours > 0) ? (hours + hrsText + ((mins !== 0) ? ',' + minText : ''  )) : ('' + minText)) + ')</span>';


            // append the custom SPAN element into LI element
            args.element.appendChild(span);

        }, 10);

    }
}
