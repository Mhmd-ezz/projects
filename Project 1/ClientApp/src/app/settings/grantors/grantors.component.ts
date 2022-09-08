import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';

import { BehaviorSubject, merge, Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, takeUntil, tap } from 'rxjs/operators';
import { GrantorsDataSource } from './grantors.datasource';
import { DeleteGrantorSheetComponent } from './delete-grantor.component';
import { ISearchOptions } from 'app/blocks/interface/search-options';
import { Store } from '@ngrx/store';
import { AppState } from '@appStore/reducers';
import * as fromGrantorsActions from '@appStore/actions';
import {  getGrantors, getGrantorsState, getGrantorsTotal } from '@appStore/selectors';
import { FuzzySearchService } from 'app/blocks/pipes/fuzzy-search.service';
import { GrantorBase } from 'app/blocks/graphql/generated/bases';
import { PaginatorService } from 'app/blocks/utils/paginator.service';
import { Apollo } from 'apollo-angular';
import { Grantor, DeleteGrantorGQL } from 'app/blocks/graphql/generated/gqlServices';

@Component({
    selector: 'grantors',
    templateUrl: './grantors.component.html',
    styleUrls: ['./grantors.component.scss']
})
export class GrantorsComponent implements OnInit, OnDestroy {

    // Private
    private _unsubscribeAll: Subject<any>;
    private grantorsSubject = new BehaviorSubject<Grantor[]>([]);

    private loadingSubject = new BehaviorSubject<boolean>(false);
    public loading$ = this.loadingSubject.asObservable();

    private isNetworkSubject = new BehaviorSubject<boolean>(false);
    public isNetwork$ = this.isNetworkSubject;

    private totalSubject = new BehaviorSubject<number>(0);
    // public total$ = this.totalSubject.asObservable();
    public total$: Observable<number> = this.totalSubject.asObservable();

    private noMoreRecordsSubject = new BehaviorSubject<boolean>(false);
    public noMoreRecords$ = this.noMoreRecordsSubject.asObservable();

    // @ user isSearchStatus to unsubscribe either loadGrantors or searchGrantors
    private isSearchStatus = false;

    @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
    @ViewChild('input', { static: false }) input: ElementRef;

    public pageSizeOptions = [10, 20, 40];
    public search = new FormControl('');
    public noMoreRecords = false;
    public noData: any;
    public displayedColumns: string[] = ['index', 'name', 'action'];
    public dataSource = new MatTableDataSource<Grantor>([]);
    private searchOptionsDefaults: ISearchOptions = {
        keys: ['name'],
        fuzzySearchOptions: {},
        extractOriginalItem: true,
        outputLimit: 2000
    };
    page:number=1;
    size:number=10;
    searchValue: string = '';
    allGrantors: Grantor[] = [];
    constructor(
        public _grantorsDataSource: GrantorsDataSource,
        private _deleteGrantorGQL: DeleteGrantorGQL,
        private bottomSheet: MatBottomSheet,
        private snackBar: MatSnackBar,
        private _store: Store<AppState>,
        private _fuzzySearch:FuzzySearchService,
        private _paginator: PaginatorService,
    ) {
        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    ngOnInit(): void {

        this.loadGrantors();
        this.loadGrantorsTotal();

        this.noData = this.grantorsSubject.asObservable().pipe(map(data => data.length === 0));

        this.grantorsSubject.asObservable().subscribe(data => (this.dataSource.data = data));

       

        this._store.select(getGrantors)
        .pipe(takeUntil(this._unsubscribeAll),
        tap((res: any) => {
            this.loadingSubject.next(false);
        }))        
        .subscribe((data) => {
            if (data ) {

                // @ no recordss found
                if (data.data.length > 0) { this.noMoreRecordsSubject.next(false); }
                else { this.noMoreRecordsSubject.next(true); }

                this.allGrantors = data.data;

                let paginate = this._paginator.paginate<GrantorBase>(
                    data.data,
                    this.searchValue,
                    this.page,
                    this.size,
                    '',
                    false,
                    this.searchOptionsDefaults)

                this.dataSource.data = paginate;

                this.grantorsSubject.next(this.dataSource.data);
            }
        });

        this.total$.subscribe();

        this._store.select(getGrantorsTotal)
            .pipe(takeUntil(this._unsubscribeAll),
            ).subscribe(data => {
                this.totalSubject.next(data.total);
            });
    }

    ngAfterViewInit(): void {
        // @ on search keyup
        this.search.valueChanges
            .pipe(  
                debounceTime(600),
                distinctUntilChanged(),
                tap((value: any) => {
                    if (value !== '') {
                        this.searchValue = this.search.value;
                        // @ reset paginator
                        this.paginator.pageIndex = 0;
                        // @ let matTable manage paginator
                        // this.dataSource.paginator = this.paginator;
                        // @ search for patients
                        this.isSearchStatus = false;
                        // this._store.dispatch(
                        //     fromGrantorsActions.loadAllGrantors({
                        //         filter: value,
                        //         page: 0,
                        //         size: 10,
                        //         options: this.searchOptionsDefaults
                        //     }))
                        this.loadPage();
                        // @ search for patients
                        //this._grantorsDataSource.searchGrantor(value, this.searchOptionsDefaults);
                    } else {
                        this.searchValue = '';
                        // this.isSearchStatus = false;
                        // @ dispose dataSource paginator, we are going to handle pagination
                        // this.dataSource.paginator = null;
                        // @ reset paginator
                        this.paginator.pageIndex = 0;
                        // @ load patients again from backend
                        this.loadPage();
                    }
                    // this.allGrantors.forEach((grantor) => {
                    //     const idToRemove = "Grantor:" + grantor.id;
                    //     this.apollo.client.cache.evict({id: idToRemove});
                    // })
                    // this.apollo.client.cache.gc();

                })
            )
            .subscribe();

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
        this.grantorsSubject.complete();
        this.loadingSubject.complete();
        this.totalSubject.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    loadGrantors() {
        this.loadingSubject.next(true);
//'', 1, this.pageSizeOptions[0]
        // @ update status to prevent searchpatient from subscribing
        // @ filter observable by isSearchStatus to prevent overwrite search data
        this.isSearchStatus = false;
        this._store.dispatch(
            fromGrantorsActions.loadAllGrantors({
                filter: this.searchValue,
                page: this.page,
                size: this.size,
                options:  {}
            }))


    }

    loadGrantorsTotal() {
        this.loadingSubject.next(true);
        this.isSearchStatus = false;
        this._store.dispatch(
            fromGrantorsActions.loadAllGrantorsTotal({
                filter: this.searchValue,
                page: this.page,
                size: this.size,
                options:  {}
            })
        )
    }

    loadPage() {
        this.page = this.paginator.pageIndex + 1;
        this.size = this.paginator.pageSize
        this._store.dispatch(
            fromGrantorsActions.loadAllGrantors({
                filter:  this.searchValue,
                page: this.page,
                size: this.size,
                options:  {}
            }))

        this._store.dispatch(
            fromGrantorsActions.loadAllGrantorsTotal({
                filter:  this.searchValue,
                page: this.page,
                size: this.size,
                options:  {}
            }))

        // this._grantorsDataSource.loadGrantors(
        //     this.input.nativeElement.value,
        //     this.paginator.pageIndex + 1,
        //     this.paginator.pageSize
        // );
    }

    deleteGrantor(id) {

        // @ Prevent delete request when offline
        if (navigator.onLine === false) {
            // @ we are offline do something
            this.snackBar.open("To delete grantor you need internet access", 'CLOSE', {
                panelClass: "m-24",
                duration: 8000,
            });
            return false
        }

        this.openBottomSheet(id);
    }

    openBottomSheet(id): void {

        const sheet = this.bottomSheet.open(DeleteGrantorSheetComponent);

        sheet.afterDismissed().subscribe((result) => {

            const deleteConfirmed = typeof result !== 'undefined' ? result.deleteConfirmed : false;

            if (deleteConfirmed) {
                this.dataSource.data = this.dataSource.data.filter(obj => obj.id !== id);

                this._store.dispatch(fromGrantorsActions.deleteGrantor({id: id}));

                this.paginator.length--;

                if(this.dataSource.data.length % 10 === 0) {
                    this.paginator.pageIndex--;
                }

                this.loadPage();

                this.snackBar.open('Grantor deleted', 'CLOSE', {
                    panelClass: 'm-24',
                    duration: 3000,
                });
            }
        });

    }

}
