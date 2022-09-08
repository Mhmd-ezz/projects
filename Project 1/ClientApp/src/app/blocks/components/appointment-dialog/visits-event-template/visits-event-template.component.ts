import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Appointment, Contact } from 'app/blocks/graphql/generated/gqlServices';
import { ControlContainer, NgForm } from '@angular/forms';

@Component({
    selector: 'app-visits-event-template',
    templateUrl: './visits-event-template.component.html',
    styleUrls: ['./visits-event-template.component.scss'],
    viewProviders: [{ provide: ControlContainer, useExisting: NgForm }],
})
export class VisitsEventTemplateComponent implements OnInit {

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
