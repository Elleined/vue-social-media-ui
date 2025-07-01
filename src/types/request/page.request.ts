export interface PageRequest {
    page: number,
    size: number,
    field: string,
    sortBy: 'asc' | 'desc',
    isDeleted: boolean,
}