import { SpecialityEnum } from './../../blocks/enum/speciality.enum';
import { TenantsService } from 'app/blocks/services/tenants.service';
import { LookupsByGroupTotalGQL } from './../../blocks/graphql/generated/gqlServices';
import { Logger } from '@nsalaun/ng-logger';
import { ConstantsService } from '../../blocks/common/constants.service';
import { LookupsByGroupGQL, DeleteLookupGQL, Lookup } from '../../blocks/graphql/generated/gqlServices';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Subject, ReplaySubject, merge, BehaviorSubject } from 'rxjs';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LookupsDatasource } from './lookups.datasource';
import { DeleteDrugSheetComponent } from '../durgs/delete-drug.component';
import { filter, tap, map, takeUntil, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import {  Store } from '@ngrx/store';
import { AppState } from '@appStore/reducers';
import { getLookupsState, getTenant } from '@appStore/selectors';
import * as fromLookupsActions from '@appStore/actions';
import { FuzzySearchService } from 'app/blocks/pipes/fuzzy-search.service';
import { ISearchOptions } from 'app/blocks/interface/search-options';

@Component({
    selector: 'lookups',
    templateUrl: './lookups.component.html',
    styleUrls: ['./lookups.component.scss'],
    providers: [ConstantsService]
})
export class LookupsComponent implements OnInit {

    // Private
    private _unsubscribeAll: Subject<any>;
    private lookupsSubject = new BehaviorSubject<Lookup[]>([]);

    private loadingSubject = new BehaviorSubject<boolean>(false);
    public loading$ = this.loadingSubject.asObservable();

    private isNetworkSubject = new BehaviorSubject<boolean>(false);
    public isNetwork$ = this.isNetworkSubject;

    private totalSubject = new BehaviorSubject<number>(0);
    public total$ = this.totalSubject.asObservable();


    private noMoreRecordsSubject = new BehaviorSubject<boolean>(false);
    public noMoreRecords$ = this.noMoreRecordsSubject.asObservable();

    // @ user isSearchStatus to unsubscribe either loadlookups or searchlookups
    private isSearchStatus: boolean = false;
    page:number=1;
    size:number=10;
    // -------------------
    // @ Table
    // ------------------
    @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

    public pageSizeOptions = [10, 20, 40];
    public search = new FormControl('');
    public predefinedFilterCtrl = new FormControl(false);
    public noMoreRecords = false;
    public noData: any;
    public displayedColumns: string[] = ['index', 'text', 'value', 'predefined', 'action'];
    public dataSource = new MatTableDataSource<Lookup>([]);

    // ----------------------
    // @ Mat Select Search
    // ---------------------
    public filteredGroups: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);
    public lookupsGroupCtrl = new FormControl('');
    public lookupsGroupsFilterCtrl = new FormControl('');
    public lookupsGroups: any[] = [];
    private searchOptionsDefaults: ISearchOptions = {
        keys: ['text'],
        fuzzySearchOptions: {},
        extractOriginalItem: true,
        outputLimit: 2000
    };

    constructor(
        private _lookupsByGroupGQL: LookupsByGroupGQL,
        private _logger: Logger,
        private _constantsService: ConstantsService,
        public _lookupsDatasource: LookupsDatasource,
        public _lookupsByGroupTotalGQL: LookupsByGroupTotalGQL,
        private _deleteLookupGQL: DeleteLookupGQL,
        private bottomSheet: MatBottomSheet,
        private snackBar: MatSnackBar,
        private tenantsService: TenantsService,
        private _store: Store<AppState>,  
        private _fuzzySearch:FuzzySearchService,
    ) {

        // Set the private defaults
        this._unsubscribeAll = new Subject();

        // @ load groups from constants based on tenant speciality
        this._store.select(getTenant)
        // this.tenantsService.currentTenant$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(
                (tenant) => {
                    if (tenant === null) { return; }

                    if (tenant.speciality.key === SpecialityEnum.general) {
                        this.lookupsGroups = this._constantsService.GeneralSpecialityLookups;
                    }
                    else if (tenant.speciality.key === SpecialityEnum.cardiology) {
                        this.lookupsGroups = this._constantsService.CardiologySpecialityLookups;
                         }

                    this.initLookupsFilter();
                },
                (error) => {
                    this.snackBar.open('An error occurred', 'CLOSE', {
                        panelClass: 'm-24',
                        duration: 6000,
                    });
                });

    }

    ngOnInit() {

        // --------------------
        // @ table
        // --------------------
        this.loadLookups();
         //this._lookupsDatasource.loadLookupsByGroup(this.lookupsGroupCtrl.value || 'allergies', '', 1, this.pageSizeOptions[0], true);

         this.noData = this.lookupsSubject.asObservable().pipe(map(data => data.length === 0));

         this.lookupsSubject.asObservable().subscribe(data => this.dataSource.data = data);

        
        // this._lookupsDatasource.loadLookupsByGroup(this.lookupsGroupCtrl.value || 'allergies', '', 1, this.pageSizeOptions[0], true);

        // this.noData = this._lookupsDatasource.connect().pipe(map(data => data.length === 0));

        // this._lookupsDatasource.connect().subscribe(data => this.dataSource.data = data);
        this._store.select(getLookupsState)
        .pipe(takeUntil(this._unsubscribeAll),
        // filter(() => !this.isSearchStatus),
         tap((res: any) => {
             this.loadingSubject.next(false);
         }))        
         .subscribe((response) => {
             if (response && response.lookups) {    
                 if(!this.isSearchStatus) {         
                    console.log('isSearchStatus', this.isSearchStatus, 'data', response.lookups)
                 // @ Because of the difficulty of returning wrapped pageInfo from graphql
                 // @ then, try to handle total records from response
                 // @ just in case server responded
                 this.lookupsSubject.next(response.lookups);

                 // @ no recordss found
                 if (response.lookups.length > 0) this.noMoreRecordsSubject.next(false);
                 else this.noMoreRecordsSubject.next(true);
                 }
                 else
                 {
                    const fuzzyearch = this._fuzzySearch.search(
                        response.lookups,
                        this.search.value,
                        this.searchOptionsDefaults.keys,
                        this.searchOptionsDefaults

                    )
                    console.log('isSearchStatus', this.isSearchStatus,'search',this.search.value, 'data', response.lookups)
                    console.log('fuzzyearch', fuzzyearch)
                    if (fuzzyearch) {
                        this.totalSubject.next(fuzzyearch.length);
                        this.lookupsSubject.next(fuzzyearch);
                    }
                    else {
                        this.totalSubject.next(0);
                        this.lookupsSubject.next([]);
                    }
                     
                 }
             }
             if (response && response.lookupsByGroupTotal) {
                this.totalSubject.next(response.lookupsByGroupTotal); 
             }
            
        });
        this.watchSearchGroup();
        this.watchFilterGroup();


    }

    ngAfterViewInit() {



        this.watchSearch();
        this.watchFilterPredefinedChanges();

        // this.sort.sortChange,
        merge(this.paginator.page)
            .pipe(
                // @ take while search is empty
                filter(val => !this.search.value),
                tap(() => this.loadPage())
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
        this.noMoreRecordsSubject.complete();
        this.lookupsSubject.complete();
        this.loadingSubject.complete();
        this.totalSubject.complete();
    }


    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    private loadLookups(){
         // @ update status to prevent searchpatient from subscribing
        // @ filter observable by isSearchStatus to prevent overwrite search data
        this.isSearchStatus = false;

        this.loadingSubject.next(true);
        this._store.dispatch(
            fromLookupsActions.loadLookups({
                group: this.lookupsGroupCtrl.value || 'allergies',
                filter: '',
                page: 1,
                size: this.pageSizeOptions[0],
                filterPredefined: true
            }))
            this._store.dispatch(
                fromLookupsActions.loadLookupsTotal({
                    group: this.lookupsGroupCtrl.value || 'allergies',
                    filter: '',
                    page: 1,
                    size: this.pageSizeOptions[0],
                    filterPredefined: true
                }))
                
            
        

    }
    loadPage() {
        this.isSearchStatus = false;

        this.loadingSubject.next(true);
        this.page= this.paginator.pageIndex + 1;
        this.size= this.paginator.pageSize
        this._store.dispatch(
            fromLookupsActions.loadLookups({
                group:  this.lookupsGroupCtrl.value,
                filter: this.search.value,
                page: this.paginator.pageIndex + 1,
                size: this.paginator.pageSize,
                filterPredefined:   this.predefinedFilterCtrl.value
            }))

            this._store.dispatch(
                fromLookupsActions.loadLookupsTotal({
                    group:  this.lookupsGroupCtrl.value,
                    filter: this.search.value,
                    page: this.paginator.pageIndex + 1,
                    size: this.paginator.pageSize,
                    filterPredefined:   this.predefinedFilterCtrl.value
                }))
        // this._lookupsDatasource.loadLookupsByGroup(
        //     this.lookupsGroupCtrl.value,
        //     this.search.value,
        //     this.paginator.pageIndex + 1,
        //      this.paginator.pageIndex + 1,
        //     this.predefinedFilterCtrl.value
        // );
    }


    deleteLookup(id) {

        // @ Prevent delete request when offline
        if (navigator.onLine === false) {
            // @ we are offline do something
            this.snackBar.open('To delete lookup you need internet access', 'CLOSE', {
                panelClass: 'm-24',
                duration: 8000,
            });
            return false;
        }

        this.openBottomSheet(id);
    }

    // @ On search for group (Select input) 
    watchSearchGroup() {

        // listen for search field value changes
        this.lookupsGroupsFilterCtrl.valueChanges
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(() => {
                this.filterGroups();
            });
    }

    watchFilterPredefinedChanges() {
        this.predefinedFilterCtrl.valueChanges.subscribe(_ => this.loadPage());
    }

    // @ On search change
    watchSearch() {

        // @ on search keyup
        this.search.valueChanges
            .pipe(
                debounceTime(600),
                distinctUntilChanged(),
                tap((value: any) => {
                    if (value !== '') {
                        // @ reset paginator
                        this.paginator.pageIndex = 0;
                        // @ let matTable manage paginator
                        this.dataSource.paginator = this.paginator;
                        // @ search for patients
                        this.isSearchStatus = true;
                        this._store.dispatch(
                            fromLookupsActions.loadLookups({
                                group: this.lookupsGroupCtrl.value,
                                filter: value,
                                page: 1,
                                size: this.pageSizeOptions[0],
                                filterPredefined: this.predefinedFilterCtrl.value
                            }))
                            this._store.dispatch(
                                fromLookupsActions.loadLookupsTotal({
                                    group: this.lookupsGroupCtrl.value,
                                    filter: value,
                                    page: 1,
                                    size: this.pageSizeOptions[0],
                                    filterPredefined: this.predefinedFilterCtrl.value
                                }))
                        // @ search for patients
                       // this._lookupsDatasource.searchLookupsByGoup(this.lookupsGroupCtrl.value, value, this.predefinedFilterCtrl.value);
                    } else {
                        // @ dispose dataSource paginator, we are going to handle pagination
                        this.dataSource.paginator = null;
                        // @ reset paginator
                        this.paginator.pageIndex = 0;
                        // @ load patients again from backend
                        this.loadPage();
                    }
                })
            )
            .subscribe();
    }

    // @ On lookup Group input change
    watchFilterGroup() {

        // @ Watch for select lookupsGroup changes and get related lookups to be pushed to table
        this.lookupsGroupCtrl
            .valueChanges
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(
                (group) => {
                    this._store.dispatch(
                        fromLookupsActions.loadLookups({
                            group:  group,
                            filter: '',
                            page: 1,
                            size: this.pageSizeOptions[0],
                            filterPredefined:   this.predefinedFilterCtrl.value
                        }))
            
                        this._store.dispatch(
                            fromLookupsActions.loadLookupsTotal({
                                group:  group,
                                filter: '',
                                page:  1,
                                size: this.pageSizeOptions[0],
                                filterPredefined:   this.predefinedFilterCtrl.value
                            }))
                   // this._lookupsDatasource.loadLookupsByGroup(group, '', 1, this.pageSizeOptions[0], this.predefinedFilterCtrl.value);
                });
    }

    // @ on delete bottom sheet
    openBottomSheet(id): void {

        const sheet = this.bottomSheet.open(DeleteDrugSheetComponent);

        sheet.afterDismissed().subscribe((result) => {

            const deleteConfirmed = typeof result !== 'undefined' ? result.deleteConfirmed : false;

            if (deleteConfirmed) {

                this._deleteLookupGQL
                    .mutate({ id })
                    .subscribe({
                        next: ({ data, errors }) => {

                            if (errors) {
                                const message = errors[0].extensions.data.message;
                                this.snackBar.open(message, 'CLOSE', {
                                    panelClass: 'm-24',
                                    duration: 15000,
                                });

                            } else if (data && data.deleteLookup) {

                                // @ remove location from table
                                this.dataSource.data = this.dataSource.data.filter(obj => obj.id !== id);

                                this.loadPage();

                                this.snackBar.open('Lookup deleted', 'CLOSE', {
                                    panelClass: 'm-24',
                                    duration: 3000,
                                });
                            }
                        },
                        error: (error) => {
                            throw new error(error);
                        }
                    });
            }
        });
    }

    // @ Filter group list locally
    private filterGroups() {
        if (!this.lookupsGroups) {
            return;
        }
        // get the search keyword
        let search = this.lookupsGroupsFilterCtrl.value;
        if (!search) {
            this.filteredGroups.next(this.lookupsGroups.slice());
            return;
        } else {
            search = search.toLowerCase();
        }
        // filter the banks
        this.filteredGroups.next(
            this.lookupsGroups.filter(o => o.text.toLowerCase().indexOf(search) > -1)
        );
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------

    private initLookupsFilter() {

        // @ Set first lookupsGroups object as default value to fire lookupCtrl changes and get initial lookups
        this.lookupsGroupCtrl.setValue(this.lookupsGroups[0].value);

        // @ filter groups
        this.filteredGroups.next(this.lookupsGroups.slice());
    }
}
