import { Component, OnInit, Output, EventEmitter, Input, ViewChild, ElementRef } from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';
import { BehaviorSubject, Subject, fromEvent } from 'rxjs';
import { map, filter, debounceTime, distinctUntilChanged, tap, shareReplay, take } from 'rxjs/operators';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { NewEditContactDialogService } from '../new-edit-contact-dialog/new-edit-contact-dialog.service';
import { SelectionNavigatorSheetComponent } from './selection-navigator.component';
import { NewEditPatientDialogService } from '../new-edit-patient-dialog/new-edit-patient-dialog.service';
import { ContactsService } from 'app/blocks/services/contacts.service';
import { ContactBase } from 'app/blocks/graphql/generated/bases';
import { ContactGQL, Contact } from 'app/blocks/graphql/generated/gqlServices';

@Component({
    selector: 'app-contact-selector',
    templateUrl: './contact-selector.component.html',
    styleUrls: ['./contact-selector.component.css'],
    viewProviders: [{ provide: ControlContainer, useExisting: NgForm }],
})
export class ContactSelectorComponent implements OnInit {

    // Private
    private _unsubscribeAll: Subject<any>;

    @Output() onChange: EventEmitter<Contact> = new EventEmitter<Contact>();

    @Input() required = false;

    @Input('contactId') public set contactId(id) {
        if (typeof id === 'string' && id !== '') {
            this._contactGQL.watch({ id })
                .valueChanges
                .subscribe(({ data, loading }) => {
                    if (data && data.contact) {
                        this.contact = data.contact;
                    }
                });
        }
    }

    @Input('contact') public set data(value) {
        // @ onChange handlers will strongify the object
        // @ due to syncfusion could not accept event property as object type (only string accepted)
        // @ then, if the value is string parse it
        if (typeof value === 'string' && value !== '') {
            value = JSON.parse(value);
        }


        this.contact = value;
    }

    @ViewChild('ctrl', { static: true }) ctrl: ElementRef;

    private loadingSubject = new BehaviorSubject<boolean>(false);
    loading$ = this.loadingSubject.asObservable();
    errorSubject = new BehaviorSubject<boolean>(false);
    options: Contact[] = [];
    options$ = new BehaviorSubject([]);
    filteredOptions = this.options$.asObservable();
    contact;


    constructor(
        private _contactsService: ContactsService,
        private _newEditContactDialogService: NewEditContactDialogService,
        private _newEditPatientDialogService: NewEditPatientDialogService,
        private _contactGQL: ContactGQL,
        private _bottomSheet: MatBottomSheet,
    ) {
        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    ngOnInit() {


        fromEvent<any>(this.ctrl.nativeElement, 'keyup')
            .pipe(
                // @ Skip on keyboard enter click
                filter((event) => event.which !== 27),
                map(event => event.target.value),
                debounceTime(700),
                distinctUntilChanged(),
                tap((value: any) => {

                    // @ search when user start typing
                    if (typeof this.contact === 'string') {

                        // @ Contact is unselected
                        // this.onChange.emit(null)

                        this.loadingSubject.next(true);
                        this.errorSubject.next(false);

                        if (value !== '') {

                            this._contactsService
                                .getContacts(value)
                                .pipe(take(2))
                                .subscribe(
                                    ({ data, loading }) => {

                                        if (loading === false) {
                                            this.loadingSubject.next(false);
                                        }

                                        // @ No data available
                                        if (!data || !data.contacts ) {
                                            this.options$.next([]);
                                            return;
                                        }

                                        // @ Got data
                                        if (data && data.contacts && data.contacts.length) {
                                            if (this.contact !== '') {
                                                this.options$.next(data.contacts);
                                            } else {
                                                // @ In case contact was cleared before we get server response
                                                this.options$.next([]);
                                            }
                                        }
                                    },
                                    (error) => {
                                        console.error('Server unreachable');
                                        this.errorSubject.next(true);
                                    });

                        } else {
                            // @ clear list when search input is empty
                            this.options$.next([]);
                            this.loadingSubject.next(false);
                            this.errorSubject.next(false);
                        }
                    }
                })
            ).subscribe();

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


    displayWith(contact) {
        if (!contact) { return ''; }
        return contact.name;
    }

    optionSelections(event: MatAutocompleteSelectedEvent) {
        this.onChange.emit(event.option.value);
    }

    openDialog() {

        let contact: ContactBase;

        // @ Creating new contact
        if (typeof this.contact === 'string') {
            contact = new ContactBase();
            contact.name = this.contact;
        } else {
            // @ edit contact
            contact = this.contact;
        }

        this._newEditContactDialogService
            .openDialog(contact)
            .subscribe(data => {
                this.contact = data;
                this.onChange.emit(data);
            });


        return;

        // @ Ask user, u want to create a patient or contact? 
        const sheet = this._bottomSheet.open(SelectionNavigatorSheetComponent);
        sheet.afterDismissed().subscribe((result) => {
            if (result.navigateTo === 'patient') {
                this._newEditPatientDialogService.openDialog().subscribe(data => {
                    console.log(data);
                    alert('Create patient not implemented!');
                });
            } else if (result.navigateTo === 'contact') {
                this._newEditContactDialogService.openDialog().subscribe(data => {
                    this.onChange.emit(data);
                });
            }

            // this._newEditContactDialogService.openDialog().subscribe(data => {
            //     this.control.setValue(data)
            //     this.onChange.emit(data)
            // })
        });


    }
}
