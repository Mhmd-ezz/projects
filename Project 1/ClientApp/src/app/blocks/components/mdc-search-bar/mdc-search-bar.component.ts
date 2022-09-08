import {
    Component,
    ElementRef,
    EventEmitter,
    HostListener,
    OnDestroy,
    OnInit,
    Output,
    Renderer2,
    ViewChild
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatOptionSelectionChange } from '@angular/material/core';
import { Router } from '@angular/router';
import * as fromPatientsActions from '@appStore/actions';
import { PatientsSearchParams } from '@appStore/model/patients-search-params';
import { AppState } from '@appStore/reducers';
import { patientsSearchMdcBarSelector } from '@appStore/selectors';
import { fuseAnimations } from '@fuse/animations';
import { Store } from '@ngrx/store';
import { ISearchOptions } from 'app/blocks/interface/search-options';
import { FuzzySearchService } from 'app/blocks/pipes/fuzzy-search.service';
import { PaginatorService } from 'app/blocks/utils/paginator.service';
import { PatientService } from 'app/patients/patient.service';
import { BehaviorSubject, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil, tap } from 'rxjs/operators';
import { IFuzzyType } from './../../interface/IFuzztType';
import { LightPatient } from './../../models/LightPatient';

@Component({
    selector: 'mdc-fuse-search-bar',
    templateUrl: './mdc-search-bar.component.html',
    styleUrls: ['./mdc-search-bar.component.scss'],
    animations: fuseAnimations
})
export class MdcFuseSearchBarComponent implements OnInit, OnDestroy {

    // Private
    private _unsubscribeAll: Subject<any>;
    private patientsSubject$: BehaviorSubject<LightPatient[]> = new BehaviorSubject<LightPatient[]>([]);
    @ViewChild('searchInput', { static: false }) searchInput: ElementRef;

    private loadingSubject = new BehaviorSubject<boolean>(false);
    public loading$ = this.loadingSubject.asObservable();
    public patients$ = this.patientsSubject$.asObservable();
    public errorSubject = new BehaviorSubject<boolean>(false);

    public collapsed: boolean;
    public loading: boolean;
    public patients: IFuzzyType<LightPatient>[];
    public searchControl = new FormControl('');
    private searchOptions: ISearchOptions = {
        keys: ['name', 'telephone', 'birthDate'],
        extractOriginalItem: false,
        outputLimit: 5
    };
    searchValue:string;
    @Output()
    input: EventEmitter<any>;

    constructor(
        private renderer: Renderer2,
        private _router: Router,
        private _patientService: PatientService,
        private _paginator: PaginatorService,
        private _store: Store<AppState>,
        private _fuzzySearch: FuzzySearchService,

    ) {
        // Set the defaults
        this.input = new EventEmitter();
        this.collapsed = true;

        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }


    // @ Listen for shift and key F, to show search input
    @HostListener('window:keydown', ['$event'])
    onMouseUp(event) {
        if (event.shiftKey && event.ctrlKey && event.keyCode === 70) {
            this.expand();
        }
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this._store.select(patientsSearchMdcBarSelector)
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe((data) => {
            if (data.length){

                this.patientsSubject$.next(data)  

                if (this.searchControl.value !== '') {
                    //this.patients = data as any;
                    const fuzzyearch = this._fuzzySearch.search(
                        data,
                        this.searchValue,
                        this.searchOptions.keys,
                        this.searchOptions)    
       
                    if (fuzzyearch)
                        this.patients = fuzzyearch;

                    else
                        this.patients = [];
                } else {
                    this.patients = [];
                }
            }else{
                this.patients = [];
                this.patientsSubject$.next([]);
            }
            this.loadingSubject.next(false);

             
           
        //}  
        });

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
                            // @ TODO: AYA

                            // this._patientService
                            //     .getLightPatients(value, 0, 10, "", false)
                            //     .pipe(
                            //         // map(({ data }) => data.patients ? data.patients : []),
                            //     ).subscribe((response)=>{
                            //         console.log("getLightPatients =>",response.data.patients,response.loading);

                            //         if (response.data.patients.length) {
                            //             // let paginate = this._paginator.paginate<PatientBase>(response.data.patients,value,0,10,'name',false)
                            //             // console.log('Collection =>',response.data.patients,' paginated =>',paginate)

                            //             if (this.searchControl.value !== '') {
                            //                 this.patients = response.data.patients as any;
                            //             } else {
                            //                 this.patients = [];
                            //             }
                            //         }else{
                            //             this.patients = [];
                            //         }

                            //         this.loadingSubject.next(false);
                            //     })

                            //     return 0;

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
                            //             }else{
                            //                 this.patients = [];
                            //             }
                            //         },
                            //         (error) => {
                            //             console.log('Server unreachable');
                            //             this.loadingSubject.next(false);
                            //             this.errorSubject.next(true);

                            //         });

                        } else {
                            // @ clear list when search input is empty
                            this.patients = [];
                            this.loadingSubject.next(false);
                            this.errorSubject.next(false);
                            this.patientsSubject$.next([]);
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
        this.patientsSubject$.next([]);
        this.patientsSubject$.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    private searchPatient() {
        const variables: PatientsSearchParams = {
            filter: this.searchControl.value,
            options: this.searchOptions,
            page: 0,
            size: 10
        };
        this.searchValue=this.searchControl.value;
        this._store.dispatch(fromPatientsActions.loadPatientsMdcBarSearch({ variables }));
  }
    /**
     * Collapse
     */
    collapse(): void {
        this.searchControl.setValue('');
        this.collapsed = true;
        
    }

    /**
     * Expand
     */
    expand(): void {
        this.searchControl.setValue('');
        this.collapsed = false;
        setTimeout(() => {
            this.searchInput.nativeElement.focus();
            // this.renderer.selectRootElement(this.searchInput.nativeElement).focus();
            // this.renderer.invokeElementMethod(this.searchInput.nativeElement, 'focus');
        }, 10);
    }

    displayLookupFn(entity?: any): string | undefined {
        return entity ? entity.name : undefined;
    }

    // MatOptionSelectionChange(result: MatOptionSelectionChange) {
    //     if (typeof result === 'object' && result.isUserInput) {
    //         if (result.source.value.id) {
    //             this._router.navigate(['/patients', result.source.value.id, 'general']);
    //             this.collapse();
    //         } else if (result.source.value._item._item._item && result.source.value._item._item._item.id) {
    //             // @ it's fuzzy search response
    //             this._router.navigate(['/patients', result.source.value._item._item._item.id, 'general']);
    //             this._store.dispatch(fromPatientsActions.loadPatient({id: result.source.value._item._item._item.id }));
    //             this.collapse();
    //         }
    //     }
    // }

    MatOptionSelectionChange(result: MatOptionSelectionChange) {
        if (typeof result === 'object' && result.isUserInput) {
            if (result.source.value.id) {
                this._router.navigate(['/patients', result.source.value.id, 'general']);
                this.collapse();
            } else if (result.source.value._item && result.source.value._item.id) {
                // @ it's fuzzy search response
                this._router.navigate(['/patients', result.source.value._item.id, 'general']);
                this._store.dispatch(fromPatientsActions.loadPatient({id: result.source.value._item.id }));
                this.collapse();
            }
        }
    }

    /**
     * Search
     *
     * @param event
     */
    search(event): void {
        // console.log(event)
        // this.input.emit(event.target.value);
    }
}
