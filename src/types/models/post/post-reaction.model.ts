export interface PostReaction {
    id : number;
    created_at: Date
    reactor_id: number
    post_id: number
    emoji_id: number
}
