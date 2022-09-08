import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import {  AppointmentsGQL, Appointment } from 'app/blocks/graphql/generated/gqlServices';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

interface DateRange {
    startTime?: any | null;
    endTime?: any | null;
    id?: string | null;
}

@Component({
    selector: 'app-event-conflict-alert',
    templateUrl: './event-conflict-alert.component.html',
    styleUrls: ['./event-conflict-alert.component.scss']
})
export class EventConflictAlertComponent implements OnInit {

    // Private
    private _unsubscribeAll: Subject<any>;
    conflictEvents: any[] = []


    @Input() set data(value: DateRange) {
        this.check(value.startTime, value.endTime, value.id)
    }

    constructor(
        private _appointmentsGQL: AppointmentsGQL,
    ) {
        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    ngOnInit() {
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    //------------------------------------------------------------------
    // @ Private methods
    //------------------------------------------------------------------

    private check(startTime: any, endTime: any, id: string): void {

        if (startTime && endTime) {
            this._appointmentsGQL
                .watch({ startTime, endTime })
                .valueChanges
                .pipe(takeUntil(this._unsubscribeAll))
                .subscribe(({ data, loading }) => {
                    if (data && data.appointments && data.appointments.length) {
                        // @ Take all events except current appointment if exists
                        let appointments = data.appointments.filter((obj: Appointment) => obj.id != id)
                        this.conflictEvents = appointments
                    } else {
                        this.conflictEvents = []
                    }
                })
        }

    }


}
