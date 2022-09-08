import { ISearchOptions } from 'app/blocks/interface/search-options';

export interface PatientsSearchParams {
    filter: string;
    options?: ISearchOptions;
    page: number | null ;
    size: number | null ;
}