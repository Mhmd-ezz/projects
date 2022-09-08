import { ContactBase } from 'app/blocks/graphql/generated/bases';
import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppUtils } from '../../utils';
import {  ContactInput, CreateContactGQL, UpdateContactGQL } from 'app/blocks/graphql/generated/gqlServices';
import { Subject } from 'rxjs';
import { NgForm } from '@angular/forms';
import { takeUntil, filter, tap, switchMap, catchError } from 'rxjs/operators';
import { FormStatusEnum } from '../mdc-form-status/form-status.enum';
@Component({
    selector: 'app-new-edit-contact-dialog',
    templateUrl: './new-edit-contact-dialog.component.html',
    styleUrls: ['./new-edit-contact-dialog.component.scss']
})
export class NewEditContactDialogComponent implements OnInit {

    // Private
    private _unsubscribeAll: Subject<any>;
    private onContactChange: Subject<any>;
    private onContactProcessor: Subject<any>;

    @ViewChild('form', { static: true}) public form: NgForm;
    public formStatusEnum: typeof FormStatusEnum = FormStatusEnum;
    public contact: ContactBase = new ContactBase();
    public formStatus: string = null;
    public errors = [];


    constructor(
        public dialogRef: MatDialogRef<NewEditContactDialogComponent>,
        private snackBar: MatSnackBar,
        private _createContactGQL: CreateContactGQL,
        private _updateContactGQL: UpdateContactGQL,
        @Inject(MAT_DIALOG_DATA) public data: ContactBase, ) {

        this._unsubscribeAll = new Subject();
        this.onContactChange = new Subject();
        this.onContactProcessor = new Subject();
    }

    ngOnInit() {
        this.contact = Object.assign(this.contact, this.data);
        this.onModelInfoChanges();
        this.sendToBackEndForProcessing();
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    onSave() {

        this.onContactChange.next();
        // // @ Send XHR request
        // // ...
        // if (!this.contact.id)
        //     this.contact.id = AppUtils.GenerateObjectId()

        // this.dialogRef.close(this.contact);

    }



    /**
  * On destroy
  */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }



    // -----------------------------------------------------------------------------------------------------
    // @  methods
    // -----------------------------------------------------------------------------------------------------

    private onModelInfoChanges(): void {
        this.onContactChange
            .pipe(takeUntil(this._unsubscribeAll))
            .pipe(
                // @ validate the form and skip if invalid
                filter(() => {
                    const isValid = AppUtils.validateForm(this.form, true);
                    if (!isValid) {
                        this.onFormStatusChanged(this.formStatusEnum.invalid);
                    }
                    return isValid;
                }),
                tap(ev => {
                    this.onFormStatusChanged(this.formStatusEnum.pending);
                }),
            )
            .subscribe(x => {
                this.onContactProcessor.next(x);
            });
    }

    private subscribeForFormChanges(): void {
        this.form
            .valueChanges
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(
                data => {
                    if (this.form.dirty) {
                        this.onContactChange.next(this.contact);
                    }
                },
                err => console.error(err)
            );
    }

    private sendToBackEndForProcessing(): void {
        this.onContactProcessor
            .pipe(takeUntil(this._unsubscribeAll))
            .pipe(
                tap(x => {
                    console.log('this.onContactProcessor saveChanges() fired');
                }),
                switchMap(x => {

                    this.onFormStatusChanged(this.formStatusEnum.saving);

                    let contact_ = Object.assign({},this.contact) as ContactInput

                    if (this.contact.id) {

                        return this._updateContactGQL.mutate(
                            { contact: contact_ },
                            // {
                            //     optimisticResponse: updatePatientGqlCallback.optimisticResponse(this.contact),
                            //     update: (proxy, ev) => updatePatientGqlCallback.update(proxy, ev)
                            // }
                        )
                    } else {

                        this.contact.createdOn = new Date();
                        this.contact.id = AppUtils.GenerateObjectId();

                        return this._createContactGQL.mutate(
                            { contact: contact_ },
                            // {
                            //     optimisticResponse: updatePatientGqlCallback.optimisticResponse(this.contact),
                            //     update: (proxy, ev) => updatePatientGqlCallback.update(proxy, ev)
                            // }
                        )
                    }
                }),
                catchError((err, source) => {

                    this.onFormStatusChanged(this.formStatusEnum.error);
                    console.error('[ CATCH ERROR ]: ', err);
                    this.snackBar.open('An error Occurred', 'CLOSE', {
                        panelClass: 'm-24',
                        duration: 4000
                    });
                    // @ Important to return source to avoid observable completion
                    return source;
                })
            )
            .pipe(
                // @ Catch when saved locally
                filter(response => {

                    if (response['dataPresent']) {
                        this.onFormStatusChanged(
                            this.formStatusEnum.savedLocally
                        );
                        this.snackBar.open(
                            'No internet access, Saved locally',
                            'CLOSE',
                            {
                                panelClass: 'm-24',
                                duration: 4000
                            }
                        );
                        return false;
                    }
                    return true;
                }),
                // @ Catch validation errors
                filter(response => {
                    return this.handleErrors(response);
                })
            )
            .subscribe(
                response => {
                    // temporarily
                    this.onFormStatusChanged(this.formStatusEnum.saved);
                    this.handleSave(response);
                },
                err => {
                    console.error(err);
                },
                () => console.warn('this.oncontactProcessor has completed !')
            );
    }

    private handleSave(response): void {
        this.onFormStatusChanged(this.formStatusEnum.saved);
        if (response.data.updateContact) {
            this.errors = [];
            AppUtils.SetFormPrestine(this.form);
            const contact = Object.assign({}, this.contact);
            this.contact = AppUtils.mergeForForms(contact, response.data.updateContact);
            this.snackBar.open('Contact updated', 'CLOSE', {
                panelClass: 'm-24',
                duration: 3000
            });
            this.dialogRef.close(this.contact);
        } else if (response.data.createContact) {
            this.errors = [];
            AppUtils.SetFormPrestine(this.form);
            const contact = Object.assign({}, this.contact);
            this.contact = AppUtils.mergeForForms(contact, response.data.createContact);
            this.contact.id=response.data.createContact.id;            
            this.snackBar.open('Contact created', 'CLOSE', {
                panelClass: 'm-24',
                duration: 3000
            });
            this.dialogRef.close(this.contact);
        }
    }

    private handleErrors(response): boolean {
        if (response.errors !== undefined && response.errors.length) {
            this.errors = AppUtils.handleValidationGqlErrors(response.errors);
        }
        // @ found Validation errors
        if (this.errors.length) {
            this.onFormStatusChanged(this.formStatusEnum.validationError);
            this.snackBar.open('An error Occurred', 'CLOSE', {
                panelClass: 'm-24',
                duration: 4000
            });
        } else if (response.errors) {
            // @ Server side errors
            const message = response.errors[0].message;
            console.error(message);
            const hasDuplicates = message.indexOf('duplicate') > 0;
            if (hasDuplicates) {
                this.onFormStatusChanged(this.formStatusEnum.duplicates);
            } else {
                this.onFormStatusChanged(this.formStatusEnum.error);
            }
        }
        // @ if errors
        return response.errors !== undefined && response.errors.length
            ? false
            : true;
    }

    onFormStatusChanged(status: string): void {
        this.formStatus = status;
    }
}
