export interface IPaginateInfo<T> {
    meta: any;
    links: string[];
    data: T[];
};
