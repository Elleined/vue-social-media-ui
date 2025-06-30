import type {PageRequest} from "@/types/models/page/page-request.interface.ts";

export interface Page<T> {
    content: T[]
    page_request: PageRequest
    total_elements: number
    total_pages: number
    has_next: boolean
    has_previous: boolean
}