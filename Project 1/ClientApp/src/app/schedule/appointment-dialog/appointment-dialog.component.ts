import { ChangeDetectionStrategy, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { ScheduleComponent } from '@syncfusion/ej2-angular-schedule';
import { NewEditContactDialogService } from 'app/blocks/components/new-edit-contact-dialog/new-edit-contact-dialog.service';
import { NewEditPatientDialogService } from 'app/blocks/components/new-edit-patient-dialog/new-edit-patient-dialog.service';
import { ContactTypesEnum } from 'app/blocks/enum/contact-types.enum';
import { EventActionTypesEnum } from 'app/blocks/enum/event-action-types.enum';
import { EventStatusEnum } from 'app/blocks/enum/event-status.enum';
import { EventTypesEnum } from 'app/blocks/enum/event-types.enum';
import { EventActionModel } from 'app/blocks/interface/event-action-model';
import { AppUtils } from 'app/blocks/utils';
import * as automapper from 'automapper-ts';
import { MatProgressButtonOptions } from 'mat-progress-buttons';
import { Subject } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { AppointmentBase, AppointmentInputBase, ContactBase } from './../../blocks/graphql/generated/bases';
import { Appointment, Contact, CreateAppointmentGQL, UpdateAppointmentGQL } from './../../blocks/graphql/generated/gqlServices';
import { ConfirmActionSheetArgs } from 'app/blocks/interface/confirm-action-sheet-args';
import { ConfirmActionSheetComponent } from 'app/blocks/components/confirm-action-sheet/confirm-action-sheet.component';

@Component({
    selector: 'app-appointment-dialog',
    templateUrl: './appointment-dialog.component.html',
    styleUrls: ['./appointment-dialog.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventDialogComponent implements OnInit {

    // Private
    private _unsubscribeAll: Subject<any>;
    @ViewChild('form', { static: true }) form: NgForm;

    EventTypesEnum: typeof EventTypesEnum = EventTypesEnum;
    event: Appointment = new AppointmentBase();
    scheduleObj: ScheduleComponent;
    eventTypes = Object.values(EventTypesEnum);
    EventActionTypesEnum = EventActionTypesEnum;
    contactTypesEnum = ContactTypesEnum;
    actionType = EventActionTypesEnum.new;
    eventStatuses = Object.values(EventStatusEnum);
    isFormDirty = false;
    errors = [];
    rec = 'FREQ=WEEKLY;BYDAY=SU,MO,TU;INTERVAL=4;UNTIL=20200214T093208Z;' || 'FREQ=DAILY;INTERVAL=1;';


    btnOpts: MatProgressButtonOptions = {
        active: false,
        text: 'SAVE',
        buttonColor: 'primary',
        barColor: 'accent',
        raised: true,
        stroked: false,
        mode: 'indeterminate',
        value: 0,
        disabled: false,
        fullWidth: false
    };

    constructor(
        public dialogRef: MatDialogRef<EventDialogComponent>,
        private _newEditPatientDialogService: NewEditPatientDialogService,
        private _createAppointmentGQL: CreateAppointmentGQL,
        private _updateAppointmentGQL: UpdateAppointmentGQL,
        private _newEditContactDialogService: NewEditContactDialogService,
        private _snackBar: MatSnackBar,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private _bottomSheet: MatBottomSheet,

    ) {

        this.event = automapper.map('Any', 'AppointmentBase', data.data);

        this.scheduleObj = data.scheduleObj || {};

        // @ Determine if creating new appointment or editing 
        if (this.event.id) {
            this.actionType = EventActionTypesEnum.edit;
        }
        else {
            this.event.id = AppUtils.GenerateObjectId();
        }

        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }


    ngOnInit() {

        // @ Update isFormDirty
        this.form.valueChanges.subscribe(data => this.isFormDirty = this.form.dirty);
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

    matSelectCompareString(stringOne, stringTwo) {
        if (stringOne != null && stringTwo != null) {
            return stringOne === stringTwo;
        }
    }

    onContactChange(event: Contact) {
        if (event) {
            this.event.contact = event;
        } else {
            this.event.contact = null;
        }
    }

    onModelChange(event) {
        console.log(event);
    }

    onCreatePatientFile() {
        this._newEditPatientDialogService.openDialog().subscribe(data => {
            alert('Create patient not implemented!');
        });
    }

    onCancelClick(): void {
        // @ User should confirm exit if form data was changed
        if (this.isFormDirty) {
            this.confirmDialogClose(this.dialogRef);
        } else {
            this.dialogRef.close();
        }

    }

    onSave(): void {
        const isValid = AppUtils.validateForm(this.form, true);

        if (!isValid) { return; }

        const event: AppointmentBase = automapper.map('Any', 'AppointmentBase', this.event);
        event.subject = event.contact && event.contact.name ? event.contact.name : event.reason;

        if (this.actionType === EventActionTypesEnum.new) {
            this.createAppointment(event);
        }

        if (this.actionType === EventActionTypesEnum.edit) {
            this.updateAppointment(event);
        }

    }

    onDelete() {

        this.actionType = EventActionTypesEnum.delete;

        const result: EventActionModel = {
            event: this.event,
            actionType: this.actionType
        };
        this.dialogRef.close(result);
    }

    onRecurrenceChange(event: string) {
        this.rec = event;
    }

    createNewContact() {

        let contact: ContactBase;

        // @ Creating new contact
        if (!this.event.contact) {
            contact = new ContactBase();
            // contact.name = this.event.contact.name
        }
        else {
            // @ edit contact
            // contact = this.contact
        }

        this._newEditContactDialogService
            .openDialog(contact)
            .subscribe((contact: ContactBase | undefined) => {
                if (typeof contact === 'undefined') { return; }

                this.event.contact = contact;

            });


        return;
    }



    // ----------------------------------------------------------------------------
    //  Private Methods
    // ----------------------------------------------------------------------------

    private closeModal(event) {

        const result: EventActionModel = {
            event: event,
            actionType: this.actionType
        };

        this.dialogRef.close(result);
    }

    private createAppointment(appointment: AppointmentBase) {

        this.btnOpts.active = true;

        let appointment_ = Object.assign({},appointment) as AppointmentInputBase;

        this._createAppointmentGQL
            .mutate(
                { appointment:appointment_ },
                // GQL Callback .... {}
            )
            .pipe(
                tap(_ => this.btnOpts.active = false),

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
                        this.closeModal(appointment);
                        return false;
                    }
                    return true;
                }),
            )
            .subscribe(
                (response) => {

                    this._snackBar.open('Appointment created.', 'CLOSE', {
                        panelClass: 'm-24',
                        duration: 3000,
                    });
                    this.btnOpts.active = false;
                    this.closeModal(appointment);
                },
                (error) => {

                    console.error('[Error]:', error);
                    this._snackBar.open('An error occurred while creating the appointment.', 'CLOSE', {
                        panelClass: 'm-24',
                        duration: 5000,
                    });
                    this.btnOpts.active = false;
                }
            );
    }

    private updateAppointment(appointment: AppointmentBase) {

        this.btnOpts.active = true;
        let appointment_ = Object.assign({},appointment) as AppointmentInputBase;

        this._updateAppointmentGQL
            .mutate(
                { appointment:appointment_ },
                // GQL Callback .... {}
            )
            .pipe(
                tap(_ => this.btnOpts.active = false),

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
                        this.closeModal(appointment);
                        return false;
                    }
                    return true;
                }),
            )
            .subscribe(
                (response) => {

                    this._snackBar.open('Appointment updated.', 'CLOSE', {
                        panelClass: 'm-24',
                        duration: 3000,
                    });
                    this.btnOpts.active = false;
                    this.closeModal(appointment);
                },
                (error) => {

                    console.error('[Error]:', error);
                    this._snackBar.open('An error occurred while updating the appointment.', 'CLOSE', {
                        panelClass: 'm-24',
                        duration: 5000,
                    });
                    this.btnOpts.active = false;
                }
            );
    }

    /**
    * @Description Confirm if appointment dialog should be closed
    * 
    * @private
    * @param {MatDialogRef<any, any>} dialog 
    * 
    * @memberOf AppScheduleComponent
    */
    private confirmDialogClose(dialog: MatDialogRef<any, any>) {

        const args: ConfirmActionSheetArgs = {
            yes: 'Exit and discard changes',
            no: 'Don\'t exit'
        };
        const Confirmsheet = this._bottomSheet.open(ConfirmActionSheetComponent, {
            data: args,
            disableClose: true
        });

        Confirmsheet.afterDismissed().subscribe(result => {
            if (result) {
                dialog.close(null);
            }
        });
    }
}

