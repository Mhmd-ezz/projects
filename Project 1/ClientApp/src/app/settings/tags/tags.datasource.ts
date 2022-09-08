import { TagsStoreService } from './../../blocks/graphql/store/tagsStore.service';
import { Tag, TagGQL } from './../../blocks/graphql/generated/gqlServices';
import { CollectionViewer } from '@angular/cdk/collections';
import { Injectable } from '@angular/core';
import { FuzzySearchService, INgFuzzyOptions } from 'app/blocks/pipes/fuzzy-search.service';
import { PagerService } from 'app/blocks/services/pager.service';
import { Subscription ,  BehaviorSubject ,  Observable ,  of } from 'rxjs';
import { catchError, filter, tap } from 'rxjs/operators';
import { TagService } from './tag.service';
import { ISearchOptions } from 'app/blocks/interface/search-options';


@Injectable()
export class TagsDataSource {
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
    private filtered: Tag[] = [];
    private _gqlService$: Subscription;
    private _storeService$: Subscription;
    private searchOptionsDefaults: ISearchOptions = {
        keys: ['name'],
        fuzzySearchOptions: {},
        extractOriginalItem: true,
        outputLimit: 2000
    };

    constructor(
        private _tagService: TagService,
        private _tagsStoreService: TagsStoreService,
        private _fuzzySearch: FuzzySearchService,
        private _pagerService: PagerService
    ) { }

    loadTags(
        filterStr: string,
        // sortDirection: string,
        page: number | null,
        size: number | null
    ) {
        // @ update status to prevent searchpatient from subscribing
        // @ filter observable by isSearchStatus to prevent overwrite search data
        this.isSearchStatus = false;

        this.loadingSubject.next(true);

        this._tagService
            .getTags(filterStr, page, size)
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
                    if (data && data.tags) {
                        // @ Because of the difficulty of returning wrapped pageInfo from graphql
                        // @ then, try to handle total records from response
                        // @ just in case server responded
                        this.tagsSubject.next(data.tags);

                        // if (!loading) {
                        // @ calc total where total is number of page (given) * size (given)
                        // @ hack : always add 1 to total until records returned are less than limit
                        if (data.tags.length < size) { this.totalSubject.next(page * size); }
                        else { this.totalSubject.next(page * size + 1); }

                        // @ no recordss found
                        if (data.tags.length > 0) { this.noMoreRecordsSubject.next(false); }
                        else { this.noMoreRecordsSubject.next(true); }
                        // } else {
                        //     this.totalSubject.next(data.tags.length);
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
     * step 1: read tags from store as fragments then filter result by filterStr
     * step 2: read tags from server and push result to store and emit result back to ui
     *
     * @param {string} filterStr
     * @param {strISearchOptionsing} options
     * @param {(number | null)} [page=1]
     * @param {(number | null)} [size=30]
     *
     * @memberOf tagsDataSource
     */
    searchTag(
        filterStr: string,
        options?: ISearchOptions,
        size: number | null = 20,
        page: number | null = 1,
    ) {
        const searchOptions = this.searchOptionsDefaults;
        Object.assign(searchOptions, this.searchOptionsDefaults, options);

        // @ update status to prevent loadtags from subscribing
        this.isSearchStatus = true;

        this._tagsStoreService
            .search<Tag>(filterStr, searchOptions)
            .pipe(filter(() => this.isSearchStatus))
            .subscribe(({ data, loading }) => {
                this.totalSubject.next(data.length);
                this.tagsSubject.next(data);
            })
    }

    /**
     * @DEPRECATED
     *
     * @param {number} page
     * @param {number} size
     *
     * @memberOf tagsDataSource
     */
    paginateFiltered(page: number, size: number) {
        const pager = this._pagerService.getPager(this.filtered.length, page + 1, size);

        // get current page of items
        const response: Tag[] = this.filtered.slice(pager.startIndex, pager.endIndex + 1);

        this.totalSubject.next(this.filtered.length);

        this.tagsSubject.next(response);
    }

    connect(): Observable<Tag[]> {
        return this.tagsSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.noMoreRecordsSubject.complete();
        this.tagsSubject.complete();
        this.loadingSubject.complete();
        this.totalSubject.complete();
    }
}
