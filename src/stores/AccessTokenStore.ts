import {defineStore} from "pinia";
import {ref} from "vue";

export const useAccessTokenStore = defineStore('accessToken', () => {
    const principal = ref<string>('')

    function getPrincipal(): string {
        return principal.value
    }

    function setPrincipal(accessToken: string) {
        principal.value = accessToken
    }

    function clearToken() {
        principal.value = ""
    }

    return { principal, getPrincipal, setPrincipal, clearToken }
}, {
    persist: true
})