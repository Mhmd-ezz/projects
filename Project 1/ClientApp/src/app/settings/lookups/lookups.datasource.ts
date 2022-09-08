import { CollectionViewer } from "@angular/cdk/collections";
import { Injectable } from "@angular/core";
import { LookupsStoreService } from 'app/blocks/graphql/store/lookupsStore.service';
import { ISearchOptions } from 'app/blocks/interface/search-options';
import { FuzzySearchService } from "app/blocks/pipes/fuzzy-search.service";
import { BehaviorSubject ,  Observable ,  of } from "rxjs";
import { catchError, filter, tap } from "rxjs/operators";
import { LookupsService } from './lookups.service';
import { Lookup, LookupsByGroupTotalGQL } from './../../blocks/graphql/generated/gqlServices';


@Injectable()
export class LookupsDatasource {
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
    private filtered: Lookup[] = [];
    private searchOptionsDefaults: ISearchOptions = {
        keys: ["text"],
        fuzzySearchOptions: {},
        extractOriginalItem: false,
        outputLimit: 10000
    };

    constructor(
        private _lookupService: LookupsService,
        private _lookupsStoreService: LookupsStoreService,
        private _fuzzySearch: FuzzySearchService,
        public _lookupsByGroupTotalGQL: LookupsByGroupTotalGQL,

    ) { }

    loadLookupsByGroup(
        group: string,
        filterStr: string,
        // sortDirection: string,
        page: number | null,
        size: number | null,
        filterPredefined: boolean | null,
    ) {
        // @ update status to prevent searchpatient from subscribing
        // @ filter observable by isSearchStatus to prevent overwrite search data
        this.isSearchStatus = false;

        this.loadingSubject.next(true);

        this._lookupService
            .getLookupsByGroup(group, filterStr, page, size, filterPredefined)
            .pipe(
                filter(() => !this.isSearchStatus),
                catchError((error, source) => {
                    return of([]);
                    return source;
                }),
                tap((res: any) => {
                    this.loadingSubject.next(false);
                })
            )
            .subscribe(
                ({ data, loading }) => {
                    if (data && data.lookupsByGroup) {
                        // @ Because of the difficulty of returning wrapped pageInfo from graphql
                        // @ then, try to handle total records from response
                        // @ just in case server responded
                        this.lookupsSubject.next(data.lookupsByGroup);

                        // @ no recordss found
                        if (data.lookupsByGroup.length > 0) this.noMoreRecordsSubject.next(false);
                        else this.noMoreRecordsSubject.next(true);
                        // } else {
                        //     this.totalSubject.next(data.lookupsByGroup.length);
                        // }
                    }
                },
                error => {
                    console.log("error", error);
                });


        this._lookupsByGroupTotalGQL
            .watch({ group, filter: filterStr, page, size, filterPredefined })
            .valueChanges
            .pipe(
                filter(() => !this.isSearchStatus),
                catchError((error, source) => {
                    return of([]);
                    return source;
                }),
            ).subscribe((data: any) => {
                if (data && data.data && data.data.lookupsByGroupTotal) {
                    this.totalSubject.next(data.data.lookupsByGroupTotal);
                }
            })

    }

    /**
     *
     * @REMARK
     * step 1: read lookups from store as fragments then filter result by filterStr
     * step 2: read lookups from server and push result to store and emit result back to ui
     *
     * @param {string} group
     * @param {string} filterStr
     * @param {object} ISearchOptions
     *
     * @memberOf lookupsDataSource
     */
    searchLookupsByGoup(
        group: string,
        filterStr: string,
        options?: ISearchOptions
    ) {
        // @ set options 
        let searchOptions = this.searchOptionsDefaults;
        Object.assign(searchOptions, this.searchOptionsDefaults, options);

        // @ update status to prevent loadlookups from subscribing
        this.isSearchStatus = true;

        this._lookupsStoreService
            .search(group, filterStr, searchOptions)
            .pipe(filter(() => this.isSearchStatus))
            .subscribe((lookups: Lookup[]) => {
                // @ filter by name, set return original items to true, and return 200 as max
                // @ returned list will be ordered by match score
                this.filtered = this._fuzzySearch.search(
                    lookups,
                    filterStr,
                    searchOptions.keys,
                    searchOptions
                );

                // @ order filtered lookups by lastseen
                // this.filtered = orderBy(this.filtered, ['lastSeen'], ['asc'])

                this.totalSubject.next(this.filtered.length);
                this.lookupsSubject.next(this.filtered);
            });
    }

    connect(): Observable<Lookup[]> {
        return this.lookupsSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.noMoreRecordsSubject.complete();
        this.lookupsSubject.complete();
        this.loadingSubject.complete();
        this.totalSubject.complete();
    }
}
