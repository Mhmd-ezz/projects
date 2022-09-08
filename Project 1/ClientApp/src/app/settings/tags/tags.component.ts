import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatSnackBar } from '@angular/material/snack-bar';

import { BehaviorSubject, merge, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, takeUntil, tap } from 'rxjs/operators';
import { TagsDataSource } from './tags.datasource';
import { ISearchOptions } from 'app/blocks/interface/search-options';
import { DeleteTagSheetComponent } from './delete-tag.component';
import { FuzzySearchService } from 'app/blocks/pipes/fuzzy-search.service';
import { Store } from '@ngrx/store';
import { AppState } from '@appStore/reducers';
import * as fromTagsActions from '@appStore/actions';
import {  getTags, getTagsState, getTagsTotal} from '@appStore/selectors';
import { DeleteTagGQL, Tag } from 'app/blocks/graphql/generated/gqlServices';
import { PaginatorService } from 'app/blocks/utils/paginator.service';
import { TagBase } from 'app/blocks/graphql/generated/bases';


@Component({
    selector: 'tags',
    templateUrl: './tags.component.html',
    styleUrls: ['./tags.component.scss']
})
export class TagsComponent implements OnInit, OnDestroy {

    // Private
    private _unsubscribeAll: Subject<any>;
    private tagsSubject = new BehaviorSubject<Tag[]>([]);

    private loadingSubject = new BehaviorSubject<boolean>(false);
    public loading$ = this.loadingSubject.asObservable();

    private isNetworkSubject = new BehaviorSubject<boolean>(false);
    public isNetwork$ = this.isNetworkSubject;

    private totalSubject = new BehaviorSubject<number>(0);
    public total$ = this.totalSubject.asObservable();

    private noMoreRecordsSubject = new BehaviorSubject<boolean>(false);
    public noMoreRecords$ = this.noMoreRecordsSubject.asObservable();

    // @ user isSearchStatus to unsubscribe either loadTags or searchTags
    private isSearchStatus = false;
    page:number=1;
    size:number=10;
    searchValue: string = '';

    @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
    @ViewChild('input', { static: false }) input: ElementRef;

    public pageSizeOptions = [10, 20, 40];
    public search = new FormControl('');
    public noMoreRecords = false;
    public noData: any;
    public displayedColumns: string[] = ['index', 'name','group', 'action'];
    public dataSource = new MatTableDataSource<Tag>([]);
    private searchOptionsDefaults: ISearchOptions = {
        keys: ['name'],
        fuzzySearchOptions: {},
        extractOriginalItem: true,
        outputLimit: 2000
    };

    constructor(
        public _tagsDataSource: TagsDataSource,
        private _deleteTagGQL: DeleteTagGQL,
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
        this.loadTags();
        this.loadTagsTotal();

        //this.noData = this._tagsDataSource.connect().pipe(map(data => data.length === 0));
        this.noData = this.tagsSubject.asObservable().pipe(map(data => data.length === 0));
        
        this.tagsSubject.asObservable().subscribe(data => (this.dataSource.data = data));

        this._store.select(getTags)
        .pipe(takeUntil(this._unsubscribeAll),
       // filter(() => !this.isSearchStatus),
        tap((res: any) => {
            this.loadingSubject.next(false);
        }))        
        .subscribe((data) => {           
            if (data ) {
                // @ no recordss found
                if (data.data.length > 0) { this.noMoreRecordsSubject.next(false); }
                else { this.noMoreRecordsSubject.next(true); }

                // this.allGrantors = data.data;

                let paginate = this._paginator.paginate<TagBase>(
                    data.data,
                    this.searchValue,
                    this.page,
                    this.size,
                    '',
                    false,
                    this.searchOptionsDefaults)

                this.dataSource.data = paginate;

                this.tagsSubject.next(this.dataSource.data);
            }
        });

        this.total$.subscribe();

        this._store.select(getTagsTotal)
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
                        //  this._store.dispatch(
                        //      fromTagsActions.loadAllTags({
                        //          filter: value,
                        //          page: 0,
                        //          size: 10,
                        //          options: this.searchOptionsDefaults
                        //      }))
                        this.loadPage();
                       // this._tagsDataSource.searchTag(value, this.searchOptionsDefaults);
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
        this.tagsSubject.complete();
        this.loadingSubject.complete();
        this.totalSubject.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    
    loadTags() {
        this.loadingSubject.next(true);
//'', 1, this.pageSizeOptions[0]
        // @ update status to prevent searchpatient from subscribing
        // @ filter observable by isSearchStatus to prevent overwrite search data
        this.isSearchStatus = false;
        this._store.dispatch(
            fromTagsActions.loadAllTags({
                filter: '',
                page: this.page,
                size: this.size,
                options:  {}
            }))
    }

    loadTagsTotal() {
        this.loadingSubject.next(true);
        this.isSearchStatus = false;
        this._store.dispatch(
            fromTagsActions.loadAllTagsTotal({
                filter: this.searchValue,
                page: this.page,
                size: this.size,
                options:  {}
            })
        );
    }

    loadPage() {
        this.page=this.paginator.pageIndex + 1;
        this.size=this.paginator.pageSize
        this._store.dispatch(
            fromTagsActions.loadAllTags({
                filter:  this.input.nativeElement.value,
                page: this.page,
                size: this.size,
                options:  {}
            }));

        this._store.dispatch(
            fromTagsActions.loadAllTagsTotal({
                filter: this.searchValue,
                page: this.page,
                size: this.size,
                options:  {}
            })
        );
        // this._tagsDataSource.loadTags(
        //     this.input.nativeElement.value,
        //     this.paginator.pageIndex + 1,
        //     this.paginator.pageSize
        // );
    }

    deleteTag(id) {

        // @ Prevent delete request when offline
        if (navigator.onLine === false) {
            // @ we are offline do something
            this.snackBar.open("To delete tag you need internet access", 'CLOSE', {
                panelClass: "m-24",
                duration: 8000,
            });
            return false
        }

        this.openBottomSheet(id);
    }

    openBottomSheet(id): void {

        const sheet = this.bottomSheet.open(DeleteTagSheetComponent);

        sheet.afterDismissed().subscribe((result) => {

            const deleteConfirmed = typeof result !== 'undefined' ? result.deleteConfirmed : false;

            if (deleteConfirmed) {
                this.dataSource.data = this.dataSource.data.filter(obj => obj.id !== id);

                this._store.dispatch(fromTagsActions.deleteTag({id: id}));

                this.paginator.length--;

                if(this.dataSource.data.length % 10 === 0) {
                    this.paginator.pageIndex--;
                }

                this.loadPage();

                this.snackBar.open('Grantor deleted', 'CLOSE', {
                    panelClass: 'm-24',
                    duration: 3000,
                });

                // this._deleteTagGQL
                //     .mutate({ id })
                //     .subscribe({
                //         next: ({ data, errors }) => {

                //             if (errors) {
                //                 const message = errors[0].extensions.data.message;
                //                 this.snackBar.open(message, 'CLOSE', {
                //                     panelClass: 'm-24',
                //                     duration: 15000,
                //                 });

                //             } else if (data && data.deleteTag) {

                //                 // @ remove location from table
                //                 this.dataSource.data = this.dataSource.data.filter(obj => obj.id !== id);

                //                 this.loadPage();

                //                 this.snackBar.open('Tag deleted', 'CLOSE', {
                //                     panelClass: 'm-24',
                //                     duration: 3000,
                //                 });
                //             }
                //         },
                //         error: (error) => {
                //             throw new error(error);
                //         }
                //     });
            }
        });

    }

}
