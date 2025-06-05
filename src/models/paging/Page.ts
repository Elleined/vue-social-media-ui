import type PageRequest from "@/models/paging/PageRequest.ts";

export default interface Page<T> {
    content: T[]
    pageRequest: PageRequest
    totalElements: number
    totalPages: number
    hasNext: boolean
    hasPrevious: boolean
}