import { INgFuzzyOptions } from "../pipes/fuzzy-search.service";

export interface ISearchOptions {
    keys?: string[]; // @ keys that you want to match against 
    fuzzySearchOptions?: INgFuzzyOptions;
    extractOriginalItem?: boolean; // @ if true return T => T[] else FuzzySearch T => FuzzySearch[] 
    outputLimit?: number; // @ limit result
}