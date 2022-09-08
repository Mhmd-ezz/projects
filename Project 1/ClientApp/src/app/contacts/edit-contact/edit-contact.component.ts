import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
    selector: 'app-edit-contact',
    templateUrl: './edit-contact.component.html',
    styleUrls: ['./edit-contact.component.scss']
})
export class EditContactComponent implements OnInit {

    // Private
    private _unsubscribeAll: Subject<any>;

    private savingDelay = 4000;

    @ViewChild('form', { static: true }) public form: NgForm;

    public contact: ContactBase = new ContactBase();
    public types: string[] = ['patient', 'agent', 'doctor'];
    public formStatus: string = null;
    public isDirty = false;
    public errors = [];
    public formStatusEnum: typeof FormStatusEnum = FormStatusEnum;
    public onContactChange: Subject<any>;

    constructor(
        private _router: Router,
        private _route: ActivatedRoute,
        private _formUtilsService: FormUtilsService,
        private _store: Store<fromRoot.AppState>,

    ) {
        // Set the private defaults
        this._unsubscribeAll = new Subject();
        this.onContactChange = new Subject();
        this._store.dispatch(fromActions.loadContact({id:this._route.snapshot.params.id }))
    }

    ngOnInit() {

        // @ On contact details
        this._store.select(fromSelectors.selectedContactSelector)
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(data => {
                if (data && data.data)
                    this.contact = AppUtils.mergeForForms(this.contact, data.data);
            })

        // @ On update
        this._store.select(fromSelectors.updateContactSelector)
            .pipe(
                takeUntil(this._unsubscribeAll),
                filter(contact => !!contact)
            )
            .subscribe(contact => {
                this._formUtilsService.formSaved()
                this.onUpdatedCallback(contact)
            })

        // @ On Contact updated locally
        this._store.select(fromSelectors.updateContactLocallySelector)
            .pipe(
                takeUntil(this._unsubscribeAll),
                filter(data => !!data)
            )
            .subscribe((d) => {
                this._formUtilsService.formSavedLocally()
            })

        // @ On Contact update failure
        this._store.select(fromSelectors.updateContactFailureSelector)
            .pipe(
                takeUntil(this._unsubscribeAll),
                filter(data => !!data)
            )
            .subscribe((errors) => this._formUtilsService.handleErrors(errors))


       // this.loadContact();
        this.subscribeForFormChanges();
        this.onModelInfoChanges();
    }


    private subscribeForFormChanges(): void {
        this.form.valueChanges.pipe(takeUntil(this._unsubscribeAll))
            .subscribe(
                (data) => {
                    if (this.form.dirty) {
                        this.onContactChange.next(this.contact);
                    }
                },
                err => console.error(err)
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
                tap(() => this._store.dispatch(fromActions.updateContact({ contact: this.contact })))
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

    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------

    private onUpdatedCallback(updatedContact: Contact): void {
        // this.errors = [];
        AppUtils.SetFormPrestine(this.form);
        const contact = Object.assign({}, this.contact);
        this.contact = AppUtils.mergeForForms(contact, updatedContact);
    }

    private loadContact() {

        this._route.paramMap
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(params => {
                const id = params.get('id');
                if (id) {
                    this._store.dispatch(fromActions.loadContact({ id }))
                }
            });
    }
}
