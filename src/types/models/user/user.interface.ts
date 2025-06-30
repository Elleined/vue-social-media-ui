import type {Nullable} from "@/types/model";

export interface User {
    id: number
    created_at: Date
    first_name: string
    last_name: string
    email: string
    attachment: Nullable
    is_active: boolean
}
