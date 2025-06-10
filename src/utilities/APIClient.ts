import axios, {type AxiosInstance} from "axios";
import {useAccessTokenStore} from "@/stores/AccessTokenStore.ts";

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
    const accessTokenStore = useAccessTokenStore()

    return  axios.create({
        baseURL: BASE_URL,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessTokenStore.getPrincipal()}`
        },
        withCredentials: true
    })
}