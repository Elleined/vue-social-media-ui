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

    function clearPrincipal(): void {
        principal.value = ""
    }

    return { getPrincipal, setPrincipal, clearPrincipal }
}, {
    persist: true
})