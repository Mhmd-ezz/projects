import { ISearchOptions } from 'app/blocks/interface/search-options';

export interface DrugsSearchParams {
    filter: string;
    page: number | null ;
    size: number | null ;
}