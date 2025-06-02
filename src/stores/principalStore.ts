import {defineStore} from "pinia";
import {ref} from "vue";
import type User from "@/model/User.ts";

export const usePrincipalStore = defineStore('user', () => {
    const principal = ref<User>()

    function getPrincipal(): User {
        return principal.value!
    }

    function setPrincipal(user: User) {
        principal.value = user
    }

    return { principal, getPrincipal, setPrincipal }
})