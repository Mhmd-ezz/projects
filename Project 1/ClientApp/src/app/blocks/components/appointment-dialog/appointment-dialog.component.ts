import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmActionSheetComponent } from 'app/blocks/components/confirm-action-sheet/confirm-action-sheet.component';
import { NewEditContactDialogService } from 'app/blocks/components/new-edit-contact-dialog/new-edit-contact-dialog.service';
import { NewEditPatientDialogService } from 'app/blocks/components/new-edit-patient-dialog/new-edit-patient-dialog.service';
import { ContactTypesEnum } from 'app/blocks/enum/contact-types.enum';
import { EventActionTypesEnum } from 'app/blocks/enum/event-action-types.enum';
import { EventStatusEnum } from 'app/blocks/enum/event-status.enum';
import { EventTypesEnum } from 'app/blocks/enum/event-types.enum';
import { AppointmentBase, ContactBase } from 'app/blocks/graphql/generated/bases';
import { Appointment, Contact, CreateAppointmentGQL } from 'app/blocks/graphql/generated/gqlServices';
import { ConfirmActionSheetArgs } from 'app/blocks/interface/confirm-action-sheet-args';
import { EventActionModel } from 'app/blocks/interface/event-action-model';
import { AppUtils } from 'app/blocks/utils';
import { EventDialogComponent } from 'app/schedule/appointment-dialog/appointment-dialog.component';
import * as automapper from "automapper-ts";
import * as moment from 'moment';
import { Observable, Subject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { LocalDbInstancesService } from './../../common/local-db-instances.service';
import { LocationViewTypeBase } from './../../graphql/generated/bases';
import { AppointmentInput, DeleteAppointmentGQL, UpdateAppointmentGQL } from './../../graphql/generated/gqlServices';

@Component({
    selector: 'app-appointment-dialog',
    templateUrl: './appointment-dialog.component.html',
    styleUrls: ['./appointment-dialog.component.scss']
})
export class AppointmentDialogComponent implements OnInit {

    private _unsubscribeAll: Subject<any>;
    @ViewChild('form', { static: true }) form: NgForm

    appointmentsSettingsStore: Observable<LocalForage>;
    EventTypesEnum: typeof EventTypesEnum = EventTypesEnum;
    event: Appointment = new AppointmentBase();
    eventTypes = Object.values(EventTypesEnum)
    EventActionTypesEnum = EventActionTypesEnum
    contactTypesEnum = ContactTypesEnum
    actionType = EventActionTypesEnum.new
    eventStatuses = Object.values(EventStatusEnum)
    isFormDirty = false;
    errors = []

    constructor(
        public dialogRef: MatDialogRef<EventDialogComponent>,
        private _newEditPatientDialogService: NewEditPatientDialogService,
        private _createAppointmentGQL: CreateAppointmentGQL,
        private _updateAppointmentGQL: UpdateAppointmentGQL,
        private _deleteAppointmentGQL: DeleteAppointmentGQL,
        private _newEditContactDialogService: NewEditContactDialogService,
        private _localDbInstancesService: LocalDbInstancesService,
        private _snackBar: MatSnackBar,
        @Inject(MAT_DIALOG_DATA) public data: AppointmentBase,
        private _bottomSheet: MatBottomSheet,
    ) {

        this.appointmentsSettingsStore = _localDbInstancesService.getAppontmentSettingsInstance();

        // @ Set event data
        if (Object.keys(data).length) {
            // this.event = automapper.map("Any", "AppointmentBase", data.data)
            this.event = data
        }

        // @ If time wasn't set
        this.event.startTime = this.event.startTime ? this.event.startTime : moment().set({ hours: 8, minutes: 0 }).toDate();
        this.event.endTime = this.event.endTime ? this.event.endTime : moment().add(10, 'minutes').toDate();

        // @ Determine if creating new appointment or editing 
        if (this.event.id) {
            this.actionType = EventActionTypesEnum.edit
        }
        else {
            this.event.id = AppUtils.GenerateObjectId()
        }

        // @ Set type to the persisted data if event type is null
        if (!this.event.type) {
            this.appointmentsSettingsStore.subscribe(store => {
                store.getItem('type')
                    .then((type: string) => {
                        this.event.type = type;
                    });
            })
        }

        // @ Set location to the persisted data if event location is null
        if (!this.event.location || Object.keys(this.event.location).length == 0) {
            this.appointmentsSettingsStore.subscribe(store => {
                store.getItem('location')
                    .then((location: LocationViewTypeBase) => {
                        this.event.location = location;
                    })
            });
        }

        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }


    ngOnInit() {

        // @ Update isFormDirty
        this.form.valueChanges.subscribe(data => this.isFormDirty = this.form.dirty)
    }

    /**
    * On destroy
    */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    //--------------------------------------------------------------------
    //  Public methods
    //--------------------------------------------------------------------   

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
        console.log(event)
    }

    onCreatePatientFile() {
        this._newEditPatientDialogService.openDialog().subscribe(data => {
            alert("Create patient not implemented!")
        })
    }

    onCancelClick(): void {
        // @ User should confirm exit if form data was changed
        if (this.isFormDirty) {
            this.confirmDialogClose(this.dialogRef)
        } else {
            this.dialogRef.close();
        }
    }

    onSave(): void {
        const isValid = AppUtils.validateForm(this.form, true);

        if (!isValid) return

        let event: AppointmentBase = automapper.map("Any", "AppointmentBase", this.event)
        event.subject = event.contact && event.contact.name ? event.contact.name : event.reason

        // @ Persist some values localy
        this.persistEventTypeLocaly(event.type)
        this.persistEventLocationLocaly(event.location)

        if (this.actionType == EventActionTypesEnum.new)
            this.createAppointment(event)

        if (this.actionType == EventActionTypesEnum.edit)
            this.updateAppointment(event)

    }

    onDelete() {
        this.confirmDelete(this.event as AppointmentBase)
    }

    onRecurrenceChange(event: string) {
        this.event.recurrenceRule = event
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
                if (typeof contact == 'undefined') return

                this.event.contact = contact
            })
        return
    }

    persistEventTypeLocaly(type: string) {

        this.appointmentsSettingsStore.subscribe(store => {
            store.setItem('type', type)
                .catch(error => {
                    console.error(['[ERROR]: Unable to update type field of appointment settings store.', error])
                });
        });
    }

    persistEventLocationLocaly(location: LocationViewTypeBase) {

        this.appointmentsSettingsStore.subscribe(store => {
            store.setItem('location', location)
                .catch(error => {
                    console.error(['[ERROR]: Unable to update location field of appointment settings store.', error])
                });
        });
    }


    //----------------------------------------------------------------------------
    //  Private Methods
    //----------------------------------------------------------------------------

    private closeModal(event, isDeleteActionType = false) {

        if (isDeleteActionType) {
            this.actionType = EventActionTypesEnum.delete
        }

        let result: EventActionModel = {
            event: event,
            actionType: this.actionType
        }

        this.dialogRef.close(result);
    }

    private deleteAppointment(appointment: AppointmentBase) {

        this._deleteAppointmentGQL.mutate(
            { id: appointment.id },
            // GQL Callback .... {}
        )
            .pipe(
                // @ Catch validation errors
                filter((response) => {

                    let isErrorExists = response.errors != undefined && response.errors.length ? true : false;

                    // @ Errors exists
                    if (isErrorExists) {
                        this.errors = AppUtils.handleValidationGqlErrors(response.errors)
                    }

                    // @ Found validation errors
                    if (this.errors.length) {
                        this._snackBar.open("An error occurred", 'CLOSE', {
                            panelClass: "m-24",
                            duration: 4000,
                        });
                    }
                    // @ Unknown error
                    else if (response.errors) {
                        console.error("[Error]: ", response.errors)
                    }

                    // @ if errors 
                    return !isErrorExists;
                }),
                // @ Catch when saved locally
                filter((response) => {

                    if (response['dataPresent']) {

                        this._snackBar.open("No internet access, Saved locally", 'CLOSE', {
                            panelClass: "m-24",
                            duration: 5000,
                        });
                        this.closeModal(appointment, true)
                        return false
                    }
                    return true
                }),
            )
            .subscribe(
                (response) => {

                    this._snackBar.open('Appointment deleted.', 'CLOSE', {
                        panelClass: "m-24",
                        duration: 3000,
                    });

                    this.closeModal(appointment, true)
                },
                (error) => {

                    console.error("[Error]:", error)
                    this._snackBar.open('An error occurred while deleting the appointment.', 'CLOSE', {
                        panelClass: "m-24",
                        duration: 5000,
                    });
                }
            )
    }


    private createAppointment(appointment: AppointmentBase) {

        let appointment__: AppointmentInput = (Object.assign({}, appointment)) as AppointmentInput;

        this._createAppointmentGQL
            .mutate(
                { appointment: appointment__ },
                // GQL Callback .... {}
            )
            .pipe(
                // @ Catch validation errors
                filter((response) => {

                    let isErrorExists = response.errors != undefined && response.errors.length ? true : false;

                    // @ Errors exists
                    if (isErrorExists) {
                        this.errors = AppUtils.handleValidationGqlErrors(response.errors)
                    }

                    // @ Found validation errors
                    if (this.errors.length) {
                        this._snackBar.open("An error occurred", 'CLOSE', {
                            panelClass: "m-24",
                            duration: 4000,
                        });
                    }
                    // @ Unknown error
                    else if (response.errors) {
                        console.error("[Error]: ", response.errors)
                    }

                    // @ if errors 
                    return !isErrorExists;
                }),
                // @ Catch when saved locally
                filter((response) => {

                    if (response['dataPresent']) {

                        this._snackBar.open("No internet access, Saved locally", 'CLOSE', {
                            panelClass: "m-24",
                            duration: 5000,
                        });
                        this.closeModal(appointment)
                        return false
                    }
                    return true
                }),
            )
            .subscribe(
                (response) => {

                    this._snackBar.open('Appointment created.', 'CLOSE', {
                        panelClass: "m-24",
                        duration: 3000,
                    });
                    this.closeModal(appointment)
                },
                (error) => {

                    console.error("[Error]:", error)
                    this._snackBar.open('An error occurred while creating the appointment.', 'CLOSE', {
                        panelClass: "m-24",
                        duration: 5000,
                    });
                }
            )
    }

    private updateAppointment(appointment: AppointmentBase) {

        let appointment__: AppointmentInput = (Object.assign({}, appointment)) as AppointmentInput;

        this._updateAppointmentGQL
            .mutate(
                { appointment: appointment__ },
                // GQL Callback .... {}
            )
            .pipe(

                // @ Catch validation errors
                filter((response) => {

                    let isErrorExists = response.errors != undefined && response.errors.length ? true : false;

                    // @ Errors exists
                    if (isErrorExists) {
                        this.errors = AppUtils.handleValidationGqlErrors(response.errors)
                    }

                    // @ Found validation errors
                    if (this.errors.length) {
                        this._snackBar.open("An error occurred", 'CLOSE', {
                            panelClass: "m-24",
                            duration: 4000,
                        });
                    }
                    // @ Unknown error
                    else if (response.errors) {
                        console.error("[Error]: ", response.errors)
                    }

                    // @ if errors 
                    return !isErrorExists;
                }),
                // @ Catch when saved locally
                filter((response) => {

                    if (response['dataPresent']) {

                        this._snackBar.open("No internet access, Saved locally", 'CLOSE', {
                            panelClass: "m-24",
                            duration: 5000,
                        });
                        this.closeModal(appointment)
                        return false
                    }
                    return true
                }),
            )
            .subscribe(
                (response) => {
                    this._snackBar.open('Appointment updated.', 'CLOSE', {
                        panelClass: "m-24",
                        duration: 3000,
                    });
                    this.closeModal(appointment)
                },
                (error) => {

                    console.error("[Error]:", error)
                    this._snackBar.open('An error occurred while updating the appointment.', 'CLOSE', {
                        panelClass: "m-24",
                        duration: 5000,
                    });
                }
            )
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

        let args: ConfirmActionSheetArgs = {
            yes: "Exit and discard changes",
            no: "Don't exit"
        }
        const Confirmsheet = this._bottomSheet.open(ConfirmActionSheetComponent, {
            data: args,
            disableClose: true
        });

        Confirmsheet.afterDismissed().subscribe(result => {
            if (result) {
                dialog.close(null)
            }
        });
    }

    /**
   * @Description Confirm if appointment dialog should be closed
   * 
   * @private
   * @param {MatDialogRef<any, any>} dialog 
   * 
   * @memberOf AppScheduleComponent
   */
    private confirmDelete(event: AppointmentBase) {

        let args: ConfirmActionSheetArgs = {
            yes: "Delete appointment",
            no: "Don't delete appointment"
        }
        const Confirmsheet = this._bottomSheet.open(ConfirmActionSheetComponent, {
            data: args,
            disableClose: true
        });

        Confirmsheet.afterDismissed().subscribe(result => {
            if (result) {
                this.deleteAppointment(event)
            }
        });
    }

}