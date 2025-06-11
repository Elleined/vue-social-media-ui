export interface CommentReaction {
    id : number;
    created_at: Date
    reactor_id: number
    comment_id: number
    emoji_id: number
}