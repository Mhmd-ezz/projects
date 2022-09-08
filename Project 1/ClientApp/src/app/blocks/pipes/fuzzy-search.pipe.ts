import { ISearchOptions } from '../interface/search-options';
import { INgFuzzyOptions } from './fuzzy-search.service';
import { FuzzySearchService } from './fuzzy-search.service';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'fuzzysearch'
})
export class FuzzySearchPipe implements PipeTransform {
    constructor(
        private _fuzzySearch: FuzzySearchService
    ) { }
    transform(collection: Array<Object>, searchTerms: string, keys: Array<any>, options: ISearchOptions = {}) {

        return this._fuzzySearch.search(collection, searchTerms, keys, options);
    }

}
