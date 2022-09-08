/* eslint-disable @typescript-eslint/naming-convention */
export interface Client {
    id?: string | null;
    name: string | null;
    country_code?: number | null;
    email?: string | null;
    size?: number | null;
    number_employees?: number | null;
    industry?: string | null;
    abbreviation: string | null;
}
