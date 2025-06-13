import {defineStore} from "pinia";
import {ref} from "vue";

export const useAccessTokenStore = defineStore('accessToken', () => {
    const principal = ref<string>('')

    function get(): string {
        return principal.value
    }

    function set(accessToken: string) {
        principal.value = accessToken
    }

    function clear(): void {
        principal.value = ""
    }

    return { principal, get, set, clear }
}, {
    persist: {
        storage: localStorage
    }
})