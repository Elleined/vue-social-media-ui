import axios, {type AxiosInstance} from "axios";
import {useAccessTokenStore} from "@/stores/AccessTokenStore.ts";
import {useRouter} from "vue-router";

export const BASE_URL: string = `http://${import.meta.env.VITE_BACKEND_HOST}:${import.meta.env.VITE_BACKEND_PORT}`


export function APIClient(): AxiosInstance {
    return axios.create({
        baseURL: BASE_URL,
        headers: {
            'Content-Type': 'application/json'
        },
        withCredentials: true,
    })
}

export function APIClientWithCredentials(): AxiosInstance {
    const router = useRouter()
    const accessTokenStore = useAccessTokenStore()

    const client = axios.create({
        baseURL: BASE_URL,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessTokenStore.getPrincipal()}`
        },
        withCredentials: true
    })

    client.interceptors.response.use(response => response, async error => {
        if (error.response?.status === 401) {
            try {
                const response = await APIClient().post('/users/refresh-tokens')
                const jwt = response.data

                accessTokenStore.setPrincipal(jwt)
            } catch (e) {
                accessTokenStore.setPrincipal("")
                await router.push('/login')
            }
        }
    })

    return client
}