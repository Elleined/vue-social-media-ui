import type {Nullable} from "@/types/nullable.interface.ts";

export interface Post {
    id: number
    created_at: Date
    content: string
    attachment: Nullable
    author_id: number
}