export interface User {
    id: number
    created_at: Date
    first_name: string
    last_name: string
    email: string
    attachment: Nullable
    is_active: boolean
}

export interface Refresh {
    id: number;
    created_at: Date
    expires_at: Date
    revoked_at: Date
    user_id: number;
}

export interface ProviderType {
    id: number;
    name: string;
}

export interface Post {
    id: number
    created_at: Date
    content: string
    attachment: Nullable
    author_id: number
}

export interface PostReaction {
    id : number;
    created_at: Date
    reactor_id: number
    post_id: number
    emoji_id: number
}

export interface Emoji {
    id: number;
    name: string;
}

export interface Comment {
    id: number
    created_at: Date
    content: string
    attachment: Nullable
    author_id: string
    post_id: number
}

export interface CommentReaction {
    id : number;
    created_at: Date
    reactor_id: number
    comment_id: number
    emoji_id: number
}

export interface Nullable {
    Valid: boolean
    String: string
}

export interface Page<T> {
    content: T[]
    page_request: PageRequest
    total_elements: number
    total_pages: number
    has_next: boolean
    has_previous: boolean
}

export interface PageRequest {
    page_number: number
    page_size: number
    field: string
    sort_by: string
}