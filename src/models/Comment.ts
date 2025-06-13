import type {Nullable} from "@/models/Nullable.ts";

export interface Comment {
    id: number
    created_at: Date
    content: string
    attachment: Nullable
    author_id: string
    post_id: number
}