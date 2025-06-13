import {defineStore} from "pinia";
import {ref} from "vue";
import type User from "@/models/User.ts";

export const useCurrentUserStore = defineStore('currentUser', () => {
    const principal = ref<User | null>(null)

    function get(): User | null{
        return principal.value
    }

    function set(currentUser: User | null): void {
        principal.value = currentUser
    }

    function clear(): void {
        principal.value = null
    }

    return { principal, get, set, clear }
}, {
    persist: {
        storage: localStorage
    }
})