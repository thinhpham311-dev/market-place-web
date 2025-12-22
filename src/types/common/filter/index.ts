export interface IFilter<TFilter = unknown> {
    ids?: string | string[];
    page?: number;
    limit?: number;
    sort?: string;
    search?: string;
    filter?: TFilter;
}
