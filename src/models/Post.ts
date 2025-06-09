export default interface Post {
    id: number
    created_at: Date
    subject: string
    content: string
    attachment: string
    author_id: number
}