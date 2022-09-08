import { GrantorsStoreService } from './../../blocks/graphql/store/grantorsStore.service';
import { Grantor } from './../../blocks/graphql/generated/gqlServices';
import { CollectionViewer } from '@angular/cdk/collections';
import { Injectable } from '@angular/core';
import { FuzzySearchService, INgFuzzyOptions } from 'app/blocks/pipes/fuzzy-search.service';
import { PagerService } from 'app/blocks/services/pager.service';
import { Subscription ,  BehaviorSubject ,  Observable ,  of } from 'rxjs';
import { catchError, filter, tap } from 'rxjs/operators';
import { GrantorService } from './grantor.service';
import { ISearchOptions } from 'app/blocks/interface/search-options';


@Injectable()
export class GrantorsDataSource {
    private grantorsSubject = new BehaviorSubject<Grantor[]>([]);

    private loadingSubject = new BehaviorSubject<boolean>(false);
    public loading$ = this.loadingSubject.asObservable();

    private isNetworkSubject = new BehaviorSubject<boolean>(false);
    public isNetwork$ = this.isNetworkSubject;

    private totalSubject = new BehaviorSubject<number>(0);
    public total$ = this.totalSubject.asObservable();

    private noMoreRecordsSubject = new BehaviorSubject<boolean>(false);
    public noMoreRecords$ = this.noMoreRecordsSubject.asObservable();

    // @ user isSearchStatus to unsubscribe either loadGrantors or searchGrantors
    private isSearchStatus = false;
    private filtered: Grantor[] = [];
    private _gqlService$: Subscription;
    private _storeService$: Subscription;
    private searchOptionsDefaults: ISearchOptions = {
        keys: ['name'],
        fuzzySearchOptions: {},
        extractOriginalItem: true,
        outputLimit: 2000
    };

    constructor(
        private _grantorService: GrantorService,
        private _grantorsStoreService: GrantorsStoreService,
        private _fuzzySearch: FuzzySearchService,
        private _pagerService: PagerService
    ) { }

    loadGrantors(
        filterStr: string,
        // sortDirection: string,
        page: number | null,
        size: number | null
    ) {
        // @ update status to prevent searchpatient from subscribing
        // @ filter observable by isSearchStatus to prevent overwrite search data
        this.isSearchStatus = false;

        this.loadingSubject.next(true);

        this._grantorService
            .getGrantors(filterStr, page, size)
            .pipe(
                filter(() => !this.isSearchStatus),
                catchError((error, source) => {
                    console.log(error);
                    return of([]);
                    return source;
                }),
                tap((res: any) => {
                    this.loadingSubject.next(false);
                })
            )
            .subscribe(
                ({ data, loading }) => {
                    if (data && data.grantors) {
                        // @ Because of the difficulty of returning wrapped pageInfo from graphql
                        // @ then, try to handle total records from response
                        // @ just in case server responded
                        this.grantorsSubject.next(data.grantors);

                        // if (!loading) {
                        // @ calc total where total is number of page (given) * size (given)
                        // @ hack : always add 1 to total until records returned are less than limit
                        if (data.grantors.length < size) { this.totalSubject.next(page * size); }
                        else { this.totalSubject.next(page * size + 1); }

                        // @ no recordss found
                        if (data.grantors.length > 0) { this.noMoreRecordsSubject.next(false); }
                        else { this.noMoreRecordsSubject.next(true); }
                        // } else {
                        //     this.totalSubject.next(data.grantors.length);
                        // }
                    }
                },
                error => {
                    console.log('error', error);
                });
    }

    /**
     *
     * @REMARK
     * step 1: read grantors from store as fragments then filter result by filterStr
     * step 2: read grantors from server and push result to store and emit result back to ui
     *
     * @param {string} filterStr
     * @param {strISearchOptionsing} options
     * @param {(number | null)} [page=1]
     * @param {(number | null)} [size=30]
     *
     * @memberOf grantorsDataSource
     */
    searchGrantor(
        filterStr: string,
        options?: ISearchOptions,
        size: number | null = 20,
        page: number | null = 1,
    ) {
        const searchOptions = this.searchOptionsDefaults;
        Object.assign(searchOptions, this.searchOptionsDefaults, options);

        // @ update status to prevent loadgrantors from subscribing
        this.isSearchStatus = true;

        this._grantorsStoreService
            .search<Grantor>(filterStr, searchOptions)
            .pipe(filter(() => this.isSearchStatus))
            .subscribe(({ data, loading }) => {
                this.totalSubject.next(data.length);
                this.grantorsSubject.next(data);
            })
    }

    /**
     * @DEPRECATED
     *
     * @param {number} page
     * @param {number} size
     *
     * @memberOf grantorsDataSource
     */
    paginateFiltered(page: number, size: number) {
        const pager = this._pagerService.getPager(this.filtered.length, page + 1, size);

        // get current page of items
        const response: Grantor[] = this.filtered.slice(pager.startIndex, pager.endIndex + 1);

        this.totalSubject.next(this.filtered.length);

        this.grantorsSubject.next(response);
    }

    connect(): Observable<Grantor[]> {
        return this.grantorsSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.noMoreRecordsSubject.complete();
        this.grantorsSubject.complete();
        this.loadingSubject.complete();
        this.totalSubject.complete();
    }
}
