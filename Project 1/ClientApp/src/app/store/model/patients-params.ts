import { ISearchOptions } from "app/blocks/interface/search-options";

export interface PatientsParams {
    sortBy?: string | null;
    page?: number | null;
    size?: number | null;
    filter?: string | null;
    descending?: boolean | null;
    options?: ISearchOptions;
}