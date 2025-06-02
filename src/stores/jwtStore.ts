import {defineStore} from "pinia";
import {ref} from "vue";
import type User from "@/model/User.ts";

export const useJWTStore = defineStore('jwt', () => {
    const principal = ref<string>()

    function getPrincipal(): string {
        return principal.value!
    }

    function setPrincipal(jwt: string) {
        principal.value = jwt
    }

    return { principal, getPrincipal, setPrincipal }
})