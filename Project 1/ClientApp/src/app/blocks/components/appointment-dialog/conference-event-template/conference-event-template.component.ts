import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';
import { Appointment } from 'app/blocks/graphql/generated/gqlServices';

@Component({
    selector: 'app-conference-event-template',
    templateUrl: './conference-event-template.component.html',
    styleUrls: ['./conference-event-template.component.scss'],
    viewProviders: [{ provide: ControlContainer, useExisting: NgForm }],

})
export class ConferenceEventTemplateComponent implements OnInit {

    @Input() event: Appointment = {};
    @Input() actionType;
    @Output() onChange: EventEmitter<Appointment> = new EventEmitter<Appointment>();

    constructor() { }

    ngOnInit() {
    }

}
