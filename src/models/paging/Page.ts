import type PageRequest from "@/models/paging/PageRequest.ts";

export default interface Page<T> {
    content: T[]
    page_request: PageRequest
    total_elements: number
    total_pages: number
    has_next: boolean
    has_previous: boolean
}