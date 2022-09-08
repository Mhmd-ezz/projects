import { Injectable } from "@angular/core";
import { sort } from 'fast-sort';
import { ISearchOptions } from "../interface/search-options";
import { FuzzySearchService } from "../pipes/fuzzy-search.service";
import { PagerService } from "../services/pager.service";
import orderBy from 'lodash/orderBy'
import { Patient } from "../graphql/generated/gqlServices";

@Injectable({
    providedIn: 'root'
})
export class PaginatorService {

    private searchOptionsDefaults: ISearchOptions = {
        keys: ["name", "telephone"],
        fuzzySearchOptions: {},
        extractOriginalItem: false,
        outputLimit: 5000
    };

    constructor(
        private _pagerService: PagerService,
        private _fuzzySearch: FuzzySearchService,

    ) { }

    public paginate<T>(collection: T[] = [], filter: string, page = 1, size = 10, sortBy: any, descending: string | boolean, options: ISearchOptions): Array<T> {

        let searchOptions = this.searchOptionsDefaults;
        Object.assign(searchOptions, this.searchOptionsDefaults, options);
        page = page == 0 ? 1 : page;
        let sorted, filtered = collection;
        
        if (!filtered.length) return [];

        // @ Apply fuzzy search in filter exists
        if (filter) {
            filtered = this._fuzzySearch.search(
                collection,
                filter,
                searchOptions.keys,
                searchOptions,
            );
        }

        if (sortBy != null && sortBy != '' && filtered.length) {
            if (sortBy == 'lastSeen') {
                sorted = descending ? sort(filtered).desc((e: Patient) => e.patientInfo.lastSeen) :
                    sort(filtered).asc((e: Patient) => e.patientInfo.lastSeen)
            } else {
                sorted = descending ? sort(filtered).desc(sortBy) : sort(filtered).asc(sortBy);
            }
        } else {
            sorted = filtered
        }

        let pagedDetails = this._pagerService.getPager(sorted.length, page, size);
        let result = sorted.slice(pagedDetails.startIndex, pagedDetails.endIndex + 1);


        return result;

    }
}