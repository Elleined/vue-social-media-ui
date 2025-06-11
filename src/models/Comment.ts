export interface Comment {
    id: number
    created_at: Date
    content: string
    attachment: string
    author_id: string
    post_id: number
}