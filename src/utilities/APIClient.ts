import axios, {type AxiosInstance} from "axios";
import {useAccessTokenStore} from "@/stores/AccessTokenStore.ts";
import {useRefreshTokenStore} from "@/stores/RefreshTokenStore.ts";
import {useRouter} from "vue-router";

export const BASE_URL: string = `http://${import.meta.env.VITE_BACKEND_HOST}:${import.meta.env.VITE_BACKEND_PORT}`

const router = useRouter()
const accessTokenStore = useAccessTokenStore()
const refreshTokenStore = useRefreshTokenStore()

export function APIClient(): AxiosInstance {
    return axios.create({
        baseURL: BASE_URL,
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

export function APIClientWithCredentials(): AxiosInstance {
    const accessToken = accessTokenStore.getPrincipal()

    const client = axios.create({
        baseURL: BASE_URL,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        },
        withCredentials: true
    })

    client.interceptors.response.use(response => response, async error => {
        try {
            if (error.response?.status !== 401) {
                return
            }

            const {data} = await APIClient().post('/users/refresh-tokens', {
                refresh_token: refreshTokenStore.getPrincipal()
            })

            accessTokenStore.setPrincipal(data.access_token)
            refreshTokenStore.setPrincipal(data.refresh_token)
        } catch (e) {
            accessTokenStore.setPrincipal("")
            refreshTokenStore.setPrincipal("")
            await router.push('/login')
        }
    })

    return client
}