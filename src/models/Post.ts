export default interface Post {
    id: number
    createdAt: Date
    subject: string
    content: string
    attachment: string
    authorId: number
}