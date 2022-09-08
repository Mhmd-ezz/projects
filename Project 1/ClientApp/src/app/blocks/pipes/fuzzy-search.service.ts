import { Injectable } from '@angular/core';
import * as fuzzySearch from 'fz-search';
import { ISearchOptions } from '../interface/search-options';

@Injectable({
    providedIn: "root"
})
export class FuzzySearchService {

    constructor() { }

    private defaults: INgFuzzyOptions = {
        output_limit: 5,
        output_map: "alias",
        token_field_min_length: 2,
        bonus_match_start: 1,
        use_index_store: false,
        dirty: true,
        score_test_fused: true,
        thresh_relative_to_best: 0.8 // @ higher more strict default value = 0.6
    };

    private searchOptions: INgFuzzyOptions = this.defaults;

    // @ extractOriginalItem : if set to true , then service will return just the original items in an array
    // @ without any extra fuzzySearch details like: key, score, _item, _match ...
    /**
     * 
     * 
     * @param {Array<Object>} collection 
     * @param {string} searchString 
     * @param {Array<any>} keys 
     * @param {INgFuzzyOptions} [options={}] 
     * @param {boolean} [extractOriginalItem=false] 
     * @param {any} [output_limit] 
     * @returns 
     * 
     * @memberOf FuzzySearchService
     */
    search(collection: Array<Object>, searchString: string, keys: Array<any>, options: ISearchOptions = {}) {

        // @ update limit if is set
        this.defaults.output_limit = options.outputLimit ? options.outputLimit : this.defaults.output_limit

        Object.assign(this.searchOptions, this.defaults, options.fuzzySearchOptions);

        let extractOriginalItem = options.extractOriginalItem ? options.extractOriginalItem : false;
        
        let results = [];
        if (searchString && searchString.length >= this.searchOptions.token_field_min_length) {

            // @ FuzzySearch Instance
            const fuzz = new fuzzySearch(this.searchOptions);

            // @ Set FuzzySearch options
            fuzz.setOptions({
                source: collection,
                keys: keys
            })

            // @ Call search method
            results = fuzz.search(searchString);

            if (extractOriginalItem) {
                let originalItems = [];

                for (let i = 0; i < results.length; i++) {
                    originalItems.push(results[i]._item)
                }

                return originalItems;
            }
            else {
                // @ loop through each result to appened highlights
                for (let i = 0; i < results.length; i++) {

                    // @ init highlights object to hande text and highlights
                    results[i]["highlights"] = {};

                    // @ loop through keys
                    for (let k = 0; k <= keys.length - 1; k++) {

                        // @ each result wil have highlights object that handle matchs
                        // @ hightlight result _item key by key 
                        results[i]["highlights"][keys[k].toString()] =
                            fuzz.highlight(results[i]._item[keys[k]], keys[k].toString());
                    }
                }

                return results;
            }
        } else {

            if (!collection)
                return;


            // @ no searchString then return limited items 
            const _items = collection.slice(0, 0);

            // @ In case the object are not extensible
            let items = _items.map((item) =>
                Object.assign({}, item, { highlights: {} })
            )

            // @ loop through items and append highlights with normal texts (no highlights)
            for (let i = 0; i < items.length; i++) {
                items[i]["highlights"] = {};
                for (let k = 0; k < keys.length; k++) {
                    items[i]["highlights"][keys[k].toString()] = items[i][keys[k]] ? items[i][keys[k]].toString() : ''
                }
            }
            return items;
        }
    }
}

export interface INgFuzzyOptions {
    output_limit?: number;
    output_map?: string;
    token_field_min_length?: number;
    use_index_store?: boolean;
    dirty?: boolean;
    thresh_include?: any
    minimum_match?: any
    bonus_match_start?: any
    bonus_token_order?: any
    thresh_relative_to_best?: any
    score_test_fused?: boolean
}
