import type {Nullable} from "@/models/Nullable.ts";

export default interface Post {
    id: number
    created_at: Date
    content: string
    attachment: Nullable
    author_id: number
}