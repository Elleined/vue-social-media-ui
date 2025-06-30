import axios, {type AxiosInstance} from "axios";
import {refreshService} from "@/services/RefreshService.ts";

export const BASE_URL: string = `http://${import.meta.env.VITE_BACKEND_HOST}:${import.meta.env.VITE_BACKEND_PORT}`

export function APIClient(): AxiosInstance {
    const client = axios.create({
        baseURL: BASE_URL,
        headers: {
            'Content-Type': 'application/json'
        },
        withCredentials: true
    })

    client.interceptors.response.use(response => response,async (error) => {
        if (error.response?.status === 401) {
            await refreshService.refreshToken();
        }
    })

    return client
}

