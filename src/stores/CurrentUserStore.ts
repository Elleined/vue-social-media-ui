import {defineStore} from "pinia";
import {ref} from "vue";
import type User from "@/models/User.ts";

export const useCurrentUserStore = defineStore('currentUser', () => {
    const principal = ref<User>({} as User)

    function getPrincipal(): User {
        return principal.value
    }

    function setPrincipal(currentUser: User) {
        principal.value = currentUser
    }

    function clearPrincipal(): void {
        principal.value = {} as User
    }

    return { getPrincipal, setPrincipal, clearPrincipal }
}, {
    persist: true
})