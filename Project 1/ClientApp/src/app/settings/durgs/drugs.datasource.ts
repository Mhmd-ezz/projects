import { DrugsStoreService } from './../../blocks/graphql/store/drugsStore.service';
import { CollectionViewer } from "@angular/cdk/collections";
import { Injectable } from "@angular/core";
import { Drug, DrugsGQL } from "app/blocks/graphql/generated/gqlServices";
import { BehaviorSubject ,  Observable ,  Subscription, of } from "rxjs";
import { catchError, tap, filter } from "rxjs/operators";
import { ISearchOptions } from "app/blocks/interface/search-options";
import { FuzzySearchService } from 'app/blocks/pipes/fuzzy-search.service';
import { DrugsService } from './drugs.service';

@Injectable()
export class DrugsDataSource {

    private drugsSubject = new BehaviorSubject<Drug[]>([]);

    private loadingSubject = new BehaviorSubject<boolean>(false);
    public loading$ = this.loadingSubject.asObservable();

    private totalSubject = new BehaviorSubject<number>(4);
    public total$ = this.totalSubject.asObservable();

    private noMoreRecordsSubject = new BehaviorSubject<boolean>(false);
    public noMoreRecords$ = this.noMoreRecordsSubject.asObservable();


    // @ user isSearchStatus to unsubscribe either load or search
    private isSearchStatus: boolean = false;
    private filtered: Drug[] = [];
    private _gqlService$: Subscription;
    private _storeService$: Subscription;
    private searchOptionsDefaults: ISearchOptions = {
        keys: ["name"],
        fuzzySearchOptions: {},
        extractOriginalItem: true,
        outputLimit: 2000
    };

    constructor(
        private _drugsService: DrugsService,
        private _drugsStoreService: DrugsStoreService,
        private _fuzzySearch: FuzzySearchService,

    ) { }

    loadDrugs(
        filterStr: string,
        page: number | null,
        size: number | null
    ) {
        this.loadingSubject.next(true);

        // @ update status to prevent searchpatient from subscribing
        // @ filter observable by isSearchStatus to prevent overwrite search data
        this.isSearchStatus = false;

        this._drugsService
            .getDrugs(filterStr, page, size)
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
                    if (data && data.drugs) {
                        // @ Because of the difficulty of returning wrapped pageInfo from graphql
                        // @ then, try to handle total records from response
                        // @ just in case server responded
                        this.drugsSubject.next(data.drugs);

                        // if (!loading) {
                        // @ calc total where total is number of page (given) * size (given)
                        // @ hack : always add 1 to total until records returned are less than limit
                        if (data.drugs.length < size) this.totalSubject.next(page * size);
                        else this.totalSubject.next(page * size + 1);

                        // @ no recordss found
                        if (data.drugs.length > 0) this.noMoreRecordsSubject.next(false);
                        else this.noMoreRecordsSubject.next(true);
                        // } else {
                        //     this.totalSubject.next(data.drugs.length);
                        // }
                    }
                },
                error => {
                    console.log("error", error);
                });
    }


    /**
     *
     * @REMARK
     * step 1: read drugs from store as fragments then filter result by filterStr
     * step 2: read drugs from server and push result to store and emit result back to ui
     *
     * @param {string} filterStr
     * @param {(number | null)} [page=0]
     * @param {(number | null)} [size=30]
     *
     * @memberOf drugsDataSource
     */
    searchDrug(
        filterStr: string,
        options?: ISearchOptions,
        page: number | null = 0,
        size: number | null = 20,
    ) {
        let searchOptions = this.searchOptionsDefaults;
        Object.assign(searchOptions, this.searchOptionsDefaults, options);

        // @ update status to prevent loadDrugs from subscribing
        this.isSearchStatus = true;

        this._drugsStoreService
            .search<Drug>(filterStr, searchOptions)
            .pipe(filter(() => this.isSearchStatus))
            .subscribe(({ data, loading }) => {
                this.totalSubject.next(data.length);
                this.drugsSubject.next(data);
            })
    }


    connect(): Observable<Drug[]> {
        return this.drugsSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.noMoreRecordsSubject.complete();
        this.drugsSubject.complete();
        this.loadingSubject.complete();
        this.totalSubject.complete();
    }
}

