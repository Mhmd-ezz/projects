import { FormInfoboxErrorService } from './../components/mdc-form-infobox-error/form-infobox-error.service';
import { FormStatusService } from './../components/mdc-form-status/form-status.service';
import { Injectable } from '@angular/core';
import { AppState } from '@appStore/reducers';
import { NgForm } from '@angular/forms';
import map from 'lodash/map';
import { Store } from '@ngrx/store';
import values from 'lodash/fp/values';

import { FormStatusEnum } from '../components/mdc-form-status/form-status.enum';
import { GraphQLError } from 'graphql';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
    providedIn: 'root'
})
export class FormUtilsService {

    public formStatusEnum: typeof FormStatusEnum = FormStatusEnum;

    constructor(
        private _store: Store<AppState>,
        private snackBar: MatSnackBar,
        private _formStatusService: FormStatusService,
        private _formInfoboxErrorService: FormInfoboxErrorService,
    ) { }

    public isValid(form: NgForm): any {

        const isValid = this.validateForm(form, false);

        if (!isValid) {
            this.formInvalid();
        }
        return isValid;
    }

    /**
     * 
     * 
     * @static
     * @param {NgForm} form 
     * @param {boolean} showErrors 
     * @returns {boolean} Boolean
     * 
     * @memberOf AppUtils
     */
    public validateForm(form: NgForm, showErrors: boolean): boolean {
        if (!form.valid) {
            if (showErrors) {
                map(form.controls, (value, key) => {
                    form.controls[key].markAsDirty();
                    form.controls[key].markAsTouched();
                });
            }
            return false;
        }
        return true;
    }

    public savedLocallyFilter(response) {

        if (response['dataPresent']) {
            this.formSavedLocally();
            this.popup('No internet access, Saved locally');
            return false;
        }
        return true;
    }


    // @ Integrated with mdc-form-error form infobox service
    public handleErrors(errors): boolean {
        let _errors = [];
        if (errors !== undefined && errors.length) {
            // @ Get gql errors
            _errors = this.handleValidationGqlErrors(errors);
            // @ Emit errors
            this._formInfoboxErrorService.errors$.next(_errors);
        }
        // @ found Validation errors
        if (_errors.length) {
            // this.formValidationError;
            this.popup('An error Occurred');
        } else if (errors) {
            // @ Server side errors
            const message = errors[0]?.message;
            const hasDuplicates = message?.indexOf('duplicate') > 0;
            if (hasDuplicates) {
                this.formDuplicates();
            } else {
                this.formError;
            }
        }
        // @ if errors
        return errors !== undefined && errors.length
            ? false
            : true;
    }


    public formInvalid() {
        this._formStatusService.formStatus$.next(this.formStatusEnum.invalid);
    }
    public formPending() {
        this._formStatusService.formStatus$.next(this.formStatusEnum.pending);
    }
    public formValidationError() {
        this._formStatusService.formStatus$.next(this.formStatusEnum.validationError);
    }
    public formSaving() {
        this._formStatusService.formStatus$.next(this.formStatusEnum.saving);
    }
    public formSaved() {
        this._formStatusService.formStatus$.next(this.formStatusEnum.saved);
    }
    public formSavedLocally() {
        this._formStatusService.formStatus$.next(this.formStatusEnum.savedLocally);
    }
    public formError() {
        this._formStatusService.formStatus$.next(this.formStatusEnum.error);
    }
    public formDuplicates() {
        this._formStatusService.formStatus$.next(this.formStatusEnum.duplicates);
    }

    public popup(message: string) {
        this.snackBar.open(message, 'CLOSE', {
            panelClass: 'm-24',
            duration: 4000
        });
    }

    matSelectCompareString(stringOne, stringTwo) {
        if (stringOne != null && stringTwo != null) {
            return stringOne === stringTwo;
        }
    }

    matSelectCompare(objOne, objTwo): boolean {
        if (
            typeof objOne !== 'undefined' &&
            typeof objTwo !== 'undefined' &&
            objOne != null &&
            objTwo != null
        ) {
            return objOne.id === objTwo.id;
        }
    }

    // ----------------------------------------------------------------------
    // @ Private Methods
    // ----------------------------------------------------------------------
    private handleValidationGqlErrors(errors: GraphQLError[]): any[] {

        if (!errors.length) { return []; }

        let result = [];
        errors.map(error => {
            if (error.message.toLocaleLowerCase() === 'GraphQL.ExecutionError: validation'.toLocaleLowerCase() && error.extensions) {
                result = error.extensions.data;
            }
        });

        // @ convert object values to array
        result = values(result);

        return result;
    }

}
