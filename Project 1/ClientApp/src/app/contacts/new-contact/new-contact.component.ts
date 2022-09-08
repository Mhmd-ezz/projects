import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import * as fromActions from '@appStore/actions';
import * as fromRoot from '@appStore/reducers';
import * as fromSelectors from '@appStore/selectors';
import { Store } from '@ngrx/store';
import { FormStatusEnum } from 'app/blocks/components/mdc-form-status/form-status.enum';
import { ContactBase } from 'app/blocks/graphql/generated/bases';
import { Contact } from 'app/blocks/graphql/generated/gqlServices';
import { AppUtils } from 'app/blocks/utils';
import { FormUtilsService } from 'app/blocks/utils/form-utils.service';
import { Subject } from 'rxjs';
import { debounceTime, filter, takeUntil, tap } from 'rxjs/operators';


@Component({
    selector: 'app-new-contact',
    templateUrl: './new-contact.component.html',
    styleUrls: ['./new-contact.component.scss']
})
export class NewContactComponent implements OnInit {

    // Private
    private _unsubscribeAll: Subject<any>;
    private savingDelay = 4000;

    @ViewChild('form', { static: true }) public form: NgForm;

    public contact: ContactBase = new ContactBase();
    public types: string[] = ['patient', 'agent', 'doctor'];
    public isDirty = false;
    public errors = [];
    public formStatusEnum: typeof FormStatusEnum = FormStatusEnum;
    public onContactChange: Subject<any>;

    constructor(
        private _router: Router,
        private _store: Store<fromRoot.AppState>,
        private _formUtilsService: FormUtilsService,
    ) {
        // Set the private defaults
        this._unsubscribeAll = new Subject();
        this.onContactChange = new Subject();
    }

    ngOnInit() {


        // @ On save locally
        this._store.select(fromSelectors.contactSavedLocallySelector)
            .pipe(
                takeUntil(this._unsubscribeAll),
                filter(data => !!data)
            )
            .subscribe(_ => this._formUtilsService.formSavedLocally())


        // @ On create contact success
        this._store.select(fromSelectors.createContactSelector)
            .pipe(
                takeUntil(this._unsubscribeAll),
                filter(contact => !!contact)
            )
            .subscribe(contact => {
                this.onSaveCallback(contact)
                this._formUtilsService.popup('Contact created.')
            })

        // @ On update
        this._store.select(fromSelectors.updateContactSelector)
            .pipe(
                takeUntil(this._unsubscribeAll),
                filter(contact => !!contact)
            )
            .subscribe(contact => this.onSaveCallback(contact))

        // @ On create Contact failure
        this._store.select(fromSelectors.createContactFailureSelector)
            .pipe(
                takeUntil(this._unsubscribeAll),
                filter(data => !!data)
            )
            .subscribe((errors) => this._formUtilsService.handleErrors(errors))



        this.subscribeForFormChanges();
        this.onModelInfoChanges();
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
                }
            );
    }

    private onModelInfoChanges(): void {
        this.onContactChange
            .pipe(takeUntil(this._unsubscribeAll))
            .pipe(
                // @ validate the form and skip if invalid
                filter(() => this._formUtilsService.isValid(this.form)),
                tap(ev => this._formUtilsService.formPending()),
                debounceTime(this.savingDelay),
                tap(() => {
                    if (this.contact.id) {
                        this._store.dispatch(fromActions.updateContact({ contact: this.contact }))
                    } else {
                        this.contact.createdOn = new Date();
                        this.contact.id = AppUtils.GenerateObjectId();
                        this._store.dispatch(fromActions.createContact({ contact: this.contact }))
                    }
                })
            )
            .subscribe();
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
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    onDone(): void {
        this._router.navigate(['/contacts']);
    }

    private onSaveCallback(updatedContact: Contact): void {
        this._formUtilsService.formSaved()
        AppUtils.SetFormPrestine(this.form);
        // const contact = Object.assign({}, this.contact);
        // this.contact = AppUtils.mergeForForms(contact, updatedContact);
    }
}
