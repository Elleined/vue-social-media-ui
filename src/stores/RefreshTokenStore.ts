import {defineStore} from "pinia";
import {ref} from "vue";

export const useRefreshTokenStore = defineStore('refreshToken', () => {
    const principal = ref<string>()

    function getPrincipal(): string {
        return principal.value!
    }

    function setPrincipal(refreshToken: string) {
        principal.value = refreshToken
    }

    return { principal, getPrincipal, setPrincipal }
})