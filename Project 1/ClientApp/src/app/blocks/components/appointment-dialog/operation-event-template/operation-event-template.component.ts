import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { NgForm, ControlContainer } from '@angular/forms';
import { ConditionSelectorArgs } from 'app/blocks/interface/condition-selector-args';
import { Contact, Appointment } from 'app/blocks/graphql/generated/gqlServices';

@Component({
    selector: 'app-operation-event-template',
    templateUrl: './operation-event-template.component.html',
    styleUrls: ['./operation-event-template.component.scss'],
    viewProviders: [{ provide: ControlContainer, useExisting: NgForm }]
})
export class OperationEventTemplateComponent implements OnInit {

    @Input() event: Appointment = {};
    @Output() onChange: EventEmitter<Appointment> = new EventEmitter<Appointment>();

    constructor() {
    }

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

    onConditionChange(event: ConditionSelectorArgs) {
        this.event.conditionId = event.id
        this.event.speciality = event.speciality
    }

    onLocationChange(event) {
        if (event) {
            this.event.location = event;
        } else {
            this.event.location = null;
        }
    }

}
