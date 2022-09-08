import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatOptionSelectionChange } from '@angular/material/core';
import * as fromPatientsActions from '@appStore/actions';
import { PatientsParams } from '@appStore/model/patients-params';
import { AppState } from '@appStore/reducers';
import { patientsSelector, patientsTotalSelector } from '@appStore/selectors';
import { Store } from '@ngrx/store';
import { PatientGQL } from 'app/blocks/graphql/generated/gqlServices';
import { IFuzzyType } from 'app/blocks/interface/IFuzztType';
import { ISearchOptions } from 'app/blocks/interface/search-options';
import { LightPatient } from 'app/blocks/models/LightPatient';
import { FuzzySearchService } from 'app/blocks/pipes/fuzzy-search.service';
import { BehaviorSubject, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil, tap } from 'rxjs/operators';

@Component({
    selector: 'mdc-search-patient',
    templateUrl: './mdc-search-patient.component.html',
    styleUrls: ['./mdc-search-patient.component.scss']
})
export class MdcSearchPatientComponent implements OnInit {

    // Private
    private _unsubscribeAll: Subject<any>;

    private loadingSubject = new BehaviorSubject<boolean>(false);
    public loading$ = this.loadingSubject.asObservable();

    public errorSubject = new BehaviorSubject<boolean>(false);

    @ViewChild('searchInput', { static: false }) searchInput: ElementRef;

    @Output() onSelectedChanged: EventEmitter<any> = new EventEmitter<any>();
    @Output() onClear: EventEmitter<any> = new EventEmitter<any>();

    // @ sizes : small / medium / large
    @Input() size = 'medium';
    @Input() minWidth = '250px';

    @Input('patientId') public set patientId(id) {
        if (typeof id === 'string' && id !== '') {
            this._patientGql.watch({ id })
                .valueChanges
                .subscribe(({ data, loading }) => {
                    if (data && data.patient) {
                        this.searchControl.setValue(data.patient);
                    }
                });
        }
    }
    searchValue:string;
    public loading: boolean;
    public patients: IFuzzyType<LightPatient>[];
    public searchControl = new FormControl('');
    private searchOptions: ISearchOptions = {
        keys: ['name', 'telephone', 'birthDate'],
        fuzzySearchOptions: {},
        extractOriginalItem: false,
        outputLimit: 5
    };

    constructor(
        private _patientGql: PatientGQL,
        private _store: Store<AppState>,      
        private _fuzzySearch:FuzzySearchService,
    ) {
        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    ngOnInit() {
        //patientsTotalSelector
        this._store.select(patientsSelector)
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((data) => {
                if (data.data.length) {

                    if (this.searchControl.value !== '') {
                        //this.patients = data as any;
                        const fuzzyearch = this._fuzzySearch.search(
                            data.data,
                            this.searchValue,
                            this.searchOptions.keys,
                            this.searchOptions)    
                        console.log('fuzzyearch in mdc-search patient',fuzzyearch)
                        if (fuzzyearch)
                            this.patients = fuzzyearch;

                        else
                            this.patients = [];
                    
                } else 
                    this.patients = [];
                
                }
                else 
                this.patients = [];
            },
        
                (error) => {
                    console.error(error);
                    console.log('Server unreachable');
                    this.errorSubject.next(true);

                }
            );
            this._store.select(patientsTotalSelector)
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((loading) => {
                this.loadingSubject.next(loading.fromServer);
            }
            );
        this.searchControl.valueChanges
            .pipe(
                debounceTime(600),
                distinctUntilChanged(),
                tap((value: any) => {
                    if (typeof value === 'string') {

                        this.loadingSubject.next(true);
                        this.errorSubject.next(false);

                        if (value !== '') {
                            this.searchPatient();
                            // this._lightPatientsStoreService
                            //     .search<IFuzzyType<LightPatient>>(value, this.searchOptions)
                            //     .subscribe(
                            //         ({ data, loading }) => {

                            //             this.loadingSubject.next(loading);

                            //             if (data.length) {

                            //                 if (this.searchControl.value !== '') {
                            //                     this.patients = data;
                            //                 } else {
                            //                     this.patients = [];
                            //                 }
                            //             } else {
                            //                 this.patients = [];
                            //             }
                            //         },
                            //         (error) => {
                            //             console.error(error);
                            //             console.log('Server unreachable');
                            //             this.errorSubject.next(true);

                            //         });
                        } else {
                            // @ clear list when search input is empty
                            this.patients = [];
                            this.loadingSubject.next(false);
                            this.errorSubject.next(false);
                        }
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

    private searchPatient() {
        const variables: PatientsParams = {
            filter: this.searchControl.value,
            options: this.searchOptions,
            page: 0,
            size: 10
        };
        this.searchValue=this.searchControl.value;
        //this._store.dispatch(fromPatientsActions.loadPatientsSearch({ variables }));
        this._store.dispatch(fromPatientsActions.loadPatients({ variables }));
  }
  
    displayLookupFn(entity?: any): string | undefined {
        return entity ? entity.name : undefined;
    }

    MatOptionSelectionChange(result: MatOptionSelectionChange) {
        if (typeof result === 'object' && result.isUserInput) {
            if (result.source.value.id) {
                // @ output emit patient id
                const id = result.source.value.id;
                this.onSelectedChanged.emit(id);
            } else if (result.source.value._item && result.source.value._item.id) {
                // @ output emit patient id
                const id = result.source.value._item.id;
                this.onSelectedChanged.emit(id);
            }
        }
    }

    search(event): void {
        // console.log(event)
        // this.input.emit(event.target.value);
    }
    clearInput() {
        this.searchInput.nativeElement.value = '';
        this.onClear.emit();
    }

    collapse(): void { }
}
