import { Component, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil, filter } from 'rxjs/operators';
import { NgForm } from '@angular/forms';
import { AppUtils } from 'app/blocks/utils';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as moment from 'moment';
import { Schedule, ScheduleGQL, UpdateScheduleGQL } from 'app/blocks/graphql/generated/gqlServices';
import { ChangeEventArgs } from '@syncfusion/ej2-calendars/src/timepicker';
const dcopy = require('deep-copy');


@Component({
    selector: 'app-schedule',
    templateUrl: './schedule.component.html',
    styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {

    @ViewChild('form', { static: true }) public form: NgForm;


    private _unsubscribeAll: Subject<any>;

    schedule: Schedule = {};
    startHour: Date;
    endHour: Date;
    errors = [];

    constructor(
        private _scheduleGQL: ScheduleGQL,
        private _updateScheduleGQL: UpdateScheduleGQL,
        private _snackBar: MatSnackBar,

    ) {

        this._unsubscribeAll = new Subject();
    }


    ngOnInit() {
        this._scheduleGQL
            .watch()
            .valueChanges
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(({ data, loading }) => {
                if (data && data.schedule) {
                    this.schedule = dcopy(data.schedule);
                    this.startHour = moment(this.schedule.startHour, 'HH:mm').toDate();
                    this.endHour = moment(this.schedule.endHour, 'HH:mm').toDate();
                }
            });
    }


    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // --------------------------------------------------------------------
    //  Public methods
    // --------------------------------------------------------------------

    onStartHourChange(event: ChangeEventArgs) {
        this.schedule.startHour = moment(event.value).format('HH:mm');
    }
    onEndHourChange(event: ChangeEventArgs) {
        this.schedule.endHour = moment(event.value).format('HH:mm');
    }

    onSave() {

        const isValid = AppUtils.validateForm(this.form, true);

        if (!isValid) {
            this._snackBar.open('Some Inputs are invalid', 'CLOSE', {
                panelClass: 'm-24',
                duration: 4000,
            });

            return;
        }

        const schedule = dcopy(this.schedule);

        this.updateSchdule(schedule);
    }

    // --------------------------------------------------------------------
    //  Private methods
    // --------------------------------------------------------------------

    private updateSchdule(schedule: Schedule) {

        this._updateScheduleGQL
            .mutate(
                { schedule },
                // GQL Callback .... {}
            )
            .pipe(
                // @ Catch validation errors
                filter((response) => {

                    const isErrorExists = response.errors !== undefined && response.errors.length ? true : false;

                    // @ Errors exists
                    if (isErrorExists) {
                        this.errors = AppUtils.handleValidationGqlErrors(response.errors);
                    }

                    // @ Found validation errors
                    if (this.errors.length) {
                        this._snackBar.open('An error occurred', 'CLOSE', {
                            panelClass: 'm-24',
                            duration: 4000,
                        });
                    }
                    // @ Unknown error
                    else if (response.errors) {
                        console.error('[Error]: ', response.errors);
                    }

                    // @ if errors 
                    return !isErrorExists;
                }),
                // @ Catch when saved locally
                filter((response) => {

                    if (response['dataPresent']) {

                        this._snackBar.open('No internet access, Saved locally', 'CLOSE', {
                            panelClass: 'm-24',
                            duration: 5000,
                        });
                        return false;
                    }
                    return true;
                }),
            )
            .subscribe(
                ({ data }) => {

                    this._snackBar.open('Schedule settings updated.', 'CLOSE', {
                        panelClass: 'm-24',
                        duration: 3000,
                    });

                },
                (error) => {

                    console.error('[Error]:', error);
                    this._snackBar.open('An error occurred while updating the shedule settings.', 'CLOSE', {
                        panelClass: 'm-24',
                        duration: 5000,
                    });
                }
            );

    }

}
