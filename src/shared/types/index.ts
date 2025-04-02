export interface MetaResponse<T, N> {
    data: T[]
    info?: N
    meta: {
        totalAmount: number;
        sortBy?: string;
        sortOrder?: 'asc' | 'desc';
    }
}