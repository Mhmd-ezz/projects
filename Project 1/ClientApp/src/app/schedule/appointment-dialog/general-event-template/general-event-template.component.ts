import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';
import { Appointment, Contact } from 'app/blocks/graphql/generated/gqlServices';

@Component({
    selector: 'app-general-event-template',
    templateUrl: './general-event-template.component.html',
    styleUrls: ['./general-event-template.component.scss'],
    viewProviders: [{ provide: ControlContainer, useExisting: NgForm }],

})
export class GeneralEventTemplateComponent implements OnInit {

    @Input() event: Appointment = {};
    @Input() actionType;
    @Output() onChange: EventEmitter<Appointment> = new EventEmitter<Appointment>();

    constructor() { }

    ngOnInit() {
    }

    //----------------------------------------------------
    // @ Public methods
    //----------------------------------------------------

    onContactChange(event: Contact) {
        if (event) {
            this.event.contact = event;
            // this.onChange.emit(this.event)
        } else {
            this.event.contact = null;
            // this.onChange.emit(this.event)
        }
    }

    onLocationChange(event) {
        if (event) {
            this.event.location = event;
        } else {
            this.event.location = null;
        }
    }

}
