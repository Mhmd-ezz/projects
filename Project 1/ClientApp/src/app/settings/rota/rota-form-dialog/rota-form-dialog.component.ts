import { RotaBase, RecurrenceBase, AppointmentBase } from './../../../blocks/graphql/generated/bases';
import { CreateRotaGQL, Rota, RotaAllGQL, RotaGQL, Recurrence, UpdateRotaGQL, RotaInput } from './../../../blocks/graphql/generated/gqlServices';
import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { Subject } from 'rxjs';
import * as moment from 'moment';
import { EventActionTypesEnum } from 'app/blocks/enum/event-action-types.enum';
import { AppUtils } from 'app/blocks/utils';
import { NgForm } from '@angular/forms';
import { filter } from 'rxjs/operators';
import { ConfirmActionSheetArgs } from 'app/blocks/interface/confirm-action-sheet-args';
import { ConfirmActionSheetComponent } from 'app/blocks/components/confirm-action-sheet/confirm-action-sheet.component';
import { RotaService } from '../rota.service';
const dcopy = require('deep-copy');

@Component({
    selector: 'app-rota-form-dialog',
    templateUrl: './rota-form-dialog.component.html',
    styleUrls: ['./rota-form-dialog.component.scss']
})
export class RotaFormDialogComponent implements OnInit {

    @ViewChild('form', { static: true }) form: NgForm;

    private _unsubscribeAll: Subject<any>;

    actionType = EventActionTypesEnum.new;
    EventActionTypesEnum = EventActionTypesEnum;
    isFormDirty = false;
    errors = [];
    rota: RotaBase = new RotaBase();

    constructor(
        private _createRotaGQL: CreateRotaGQL,
        private _updateRotaGql: UpdateRotaGQL,
        private dialogRef: MatDialogRef<RotaFormDialogComponent>,
        private _snackBar: MatSnackBar,
        private _bottomSheet: MatBottomSheet,
        private _rotaService: RotaService,

        @Inject(MAT_DIALOG_DATA) public data: RotaBase
    ) {

        if (data) {
            this.rota = dcopy(data);
        }

        // @ Determine if creating new appointment or editing 
        if (this.rota.id) {
            this.actionType = EventActionTypesEnum.edit;
        }
        else {
            this.rota.id = AppUtils.GenerateObjectId();
        }

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
    onSave() {
        const isValid = AppUtils.validateForm(this.form, true);

        if (!isValid) { return; }

        const rota = dcopy(this.rota);

        if (this.actionType === EventActionTypesEnum.new) {
            this.createRota(rota);
        }

        if (this.actionType === EventActionTypesEnum.edit) {
            this.updateRota(rota);
        }

    }

    onCancel() {

        // @ User should confirm exit if form data was changed
        if (this.isFormDirty) {
            this.confirmDialogClose(this.dialogRef);
        } else {
            this.dialogRef.close(false);
        }

    }

    addRecurrence() {
        const recurrence = new RecurrenceBase();
        recurrence.startTime = moment().set({ hour: 0, minute: 0 }).toDate();
        recurrence.endTime = moment().set({ hour: 2, minute: 0 }).toDate();
        this.rota.recurrence.push(recurrence);
    }

    onLocationChange(event) {
        if (event) {
            this.rota.location = event;
        } else {
            this.rota.location = null;
        }
    }



    // --------------------------------------------------------------------
    //  Private methods
    // --------------------------------------------------------------------   

    private closeModal(rota: RotaBase) {
        this.dialogRef.close({ rota: rota, actionType: this.actionType });
    }

    private createRota(rota: RotaBase) {

        let rota_ = Object.assign({},rota) as RotaInput;

        this._createRotaGQL
            .mutate(
                { rota: rota_ },
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
                        this.closeModal(rota);
                        return false;
                    }
                    return true;
                }),
            )
            .subscribe(
                ({ data }) => {

                    this._snackBar.open('Work time created.', 'CLOSE', {
                        panelClass: 'm-24',
                        duration: 3000,
                    });
                    if (data && data.createRota) {
                        this.closeModal(data.createRota);
                    }
                },
                (error) => {

                    console.error('[Error]:', error);
                    this._snackBar.open('An error occurred while creating the work time.', 'CLOSE', {
                        panelClass: 'm-24',
                        duration: 5000,
                    });
                }
            );
    }

    private updateRota(rota: RotaBase) {

        let rota_ = Object.assign({},rota) as RotaInput;

        this._updateRotaGql
            .mutate(
                { rota:rota_ },
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
                        this.closeModal(rota);
                        return false;
                    }
                    return true;
                }),
            )
            .subscribe(
                ({ data }) => {


                    this._snackBar.open('Work time updated.', 'CLOSE', {
                        panelClass: 'm-24',
                        duration: 3000,
                    });

                    if (data && data.updateRota) {
                        this.closeModal(data.updateRota);
                    }

                },
                (error) => {

                    console.error('[Error]:', error);
                    this._snackBar.open('An error occurred while creating the work time.', 'CLOSE', {
                        panelClass: 'm-24',
                        duration: 5000,
                    });
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
                dialog.close(false);
            }
        });
    }

}
