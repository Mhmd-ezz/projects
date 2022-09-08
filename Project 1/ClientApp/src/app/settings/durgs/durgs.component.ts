import { DrugsDataSource } from './drugs.datasource';
import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Subject, merge, BehaviorSubject } from 'rxjs';
import { map, debounceTime, distinctUntilChanged, tap, filter, takeUntil } from 'rxjs/operators';
import { Drug, DeleteDrugGQL } from './../../blocks/graphql/generated/gqlServices';
import { FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeleteDrugSheetComponent } from './delete-drug.component';
import { ISearchOptions } from 'app/blocks/interface/search-options';
import { Store } from '@ngrx/store';
import { AppState } from '@appStore/reducers';
import * as fromDrugsActions from '@appStore/actions';
import {  GetDrugs } from '@appStore/selectors';
import { FuzzySearchService } from 'app/blocks/pipes/fuzzy-search.service';

@Component({
    selector: 'app-durgs',
    templateUrl: './durgs.component.html',
    styleUrls: ['./durgs.component.scss']
})
export class DurgsComponent implements OnInit, OnDestroy {

    // Private
    private drugsSubject = new BehaviorSubject<Drug[]>([]);

    private loadingSubject = new BehaviorSubject<boolean>(false);
    public loading$ = this.loadingSubject.asObservable();

    private totalSubject = new BehaviorSubject<number>(4);
    public total$ = this.totalSubject.asObservable();

    private noMoreRecordsSubject = new BehaviorSubject<boolean>(false);
    public noMoreRecords$ = this.noMoreRecordsSubject.asObservable();
     // @ user isSearchStatus to unsubscribe either load or search
     private isSearchStatus: boolean = false;
    private _unsubscribeAll: Subject<any>;

    @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
    @ViewChild('input', { static: false }) input: ElementRef;

    public noData: any;
    public search = new FormControl('');
    public noMoreRecords = false;
    public dataSource = new MatTableDataSource<Drug>([]);
    // public displayedColumns = ['index', 'name', 'dosage', 'route', 'form', 'action'];
    public displayedColumns = ['index', 'name', 'action'];
    public pageSizeOptions = [10, 20, 40];
    private searchOptionsDefaults: ISearchOptions = {
        keys: ['name'],
        fuzzySearchOptions: {},
        extractOriginalItem: true,
        outputLimit: 2000
    };
    page:number=1;
    size:number=10;

    constructor(
        public _drugsDataSource: DrugsDataSource,
        private bottomSheet: MatBottomSheet,
        private snackBar: MatSnackBar,
        private _deleteDrugGQL: DeleteDrugGQL,
        private _store: Store<AppState>,        
        private _fuzzySearch:FuzzySearchService,
    ) {
        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    /**
     * 
     * 
     * 
     * @memberOf DurgsComponent
     */
    ngOnInit(): void {

        this.loadDrugs();
        this._store.select(GetDrugs)
        .pipe(takeUntil(this._unsubscribeAll),
       // filter(() => !this.isSearchStatus),
        tap((res: any) => {
            this.loadingSubject.next(false);
        }))        
        .subscribe((data) => {
           
            if (data) {
                if (!this.isSearchStatus) {
                    console.log('isSearchStatus', this.isSearchStatus, 'data', data)
                    this.drugsSubject.next(data);
                    if (data.length < this.size) this.totalSubject.next(this.page * this.size);
                    else this.totalSubject.next(this.page * this.size + 1);

                    // @ no recordss found
                    if (data.length > 0) this.noMoreRecordsSubject.next(false);
                    else this.noMoreRecordsSubject.next(true);

                }
                else {
                    const fuzzyearch = this._fuzzySearch.search(
                        data,
                        this.search.value,
                        this.searchOptionsDefaults.keys,
                        this.searchOptionsDefaults

                    )
                    console.log('isSearchStatus', this.isSearchStatus, 'fuzzyearch', fuzzyearch)
                    if (fuzzyearch) {
                        this.totalSubject.next(fuzzyearch.length);
                        this.drugsSubject.next(fuzzyearch);
                    }
                    else {
                        this.totalSubject.next(0);
                        this.drugsSubject.next([]);
                    }



                }
            }
    });

    this.noData = this.drugsSubject.asObservable().pipe(map(data => data.length === 0));
     // @ update table
     this.drugsSubject.asObservable().subscribe(data => this.dataSource.data = data);
        //this._drugsDataSource.loadDrugs('', 1, this.pageSizeOptions[0]);

        //this.noData = this._drugsDataSource.connect().pipe(map(data => data.length === 0));

        // @ update table
       // this._drugsDataSource.connect().subscribe(data => this.dataSource.data = data);
    }

    /**
     * 
     * 
     * 
     * @memberOf DurgsComponent
     */
    ngAfterViewInit() {

        // @ on search keyup
        this.search
            .valueChanges
            .pipe(
                debounceTime(600),
                distinctUntilChanged(),
                tap((value) => {

                    if (value !== '') {
                        console.log('value',value)
                        // @ reset paginator
                        this.paginator.pageIndex = 0;
                        // @ let matTable manage paginator
                        this.dataSource.paginator = this.paginator;
                        // @ search for patients
                        this.isSearchStatus = true;
                        this._store.dispatch(
                            fromDrugsActions.loadDrugs({
                                filter: value,
                                page: 0,
                                size: 10,
                                options: this.searchOptionsDefaults
                            }))
                        //this._drugsDataSource.searchDrug(value, this.searchOptionsDefaults);
                    } else {
                        this.isSearchStatus = false;
                        // @ dispose dataSource paginator, we are going to handle pagination
                        this.dataSource.paginator = null;
                        // @ reset paginator
                        this.paginator.pageIndex = 0;
                        // @ load patients again from backend
                        this.loadPage();
                    }

                })
            ).subscribe();


        // @ pagintation will send request to backend when search is empty
        // this.sort.sortChange,
        merge(this.paginator.page)
            .pipe(
                // @ take while search is empty
                filter(val => !this.input.nativeElement.value),
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
        this.drugsSubject.complete();
        this.loadingSubject.complete();
        this.totalSubject.complete();
    }


    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    loadDrugs() {
        this.loadingSubject.next(true);
//'', 1, this.pageSizeOptions[0]
        // @ update status to prevent searchpatient from subscribing
        // @ filter observable by isSearchStatus to prevent overwrite search data
        this.isSearchStatus = false;
        this._store.dispatch(
            fromDrugsActions.loadDrugs({
                filter: '',
                page: this.page,
                size: this.size,
                options:  {}
            }))


    }

    loadPage() {
        this.page=this.paginator.pageIndex + 1;
        this.size=this.paginator.pageSize
        this._store.dispatch(
            fromDrugsActions.loadDrugs({
                filter: '',
                page: this.paginator.pageIndex + 1,
                size: this.paginator.pageSize,
                options:  {}
            }))

        // this._drugsDataSource.loadDrugs(
        //     '',
        //     this.paginator.pageIndex + 1,
        //     this.paginator.pageSize);
    }

    deleteDrug(id) {

        // @ Prevent delete request when offline
        if (navigator.onLine === false) {
            // @ we are offline do something
            this.snackBar.open('To delete drug you need internet access', 'CLOSE', {
                panelClass: 'm-24',
                duration: 8000,
            });
            return false;
        }

        this.openBottomSheet(id);
    }

    openBottomSheet(id): void {

        const sheet = this.bottomSheet.open(DeleteDrugSheetComponent);

        sheet.afterDismissed().subscribe((result) => {

            const deleteConfirmed = typeof result !== 'undefined' ? result.deleteConfirmed : false;

            if (deleteConfirmed) {

                this._deleteDrugGQL
                    .mutate({ id })
                    .subscribe({
                        next: ({ data, errors }) => {

                            if (errors) {
                                const message = errors[0].extensions.data.message;
                                this.snackBar.open(message, 'CLOSE', {
                                    panelClass: 'm-24',
                                    duration: 15000,
                                });

                            } else if (data && data.deleteDrug) {

                                // @ remove location from table
                                this.dataSource.data = this.dataSource.data.filter(obj => obj.id !== id);

                                this.snackBar.open('Drug deleted', 'CLOSE', {
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


}
