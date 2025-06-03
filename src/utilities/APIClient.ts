import axios from "axios";
import {useAccessTokenStore} from "@/stores/AccessTokenStore.ts";

const BASE_URL = `http://${import.meta.env.VITE_BACKEND_HOST}:${import.meta.env.VITE_BACKEND_PORT}`

function APIClient() {
    return axios.create({
        baseURL: BASE_URL,
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

function APIClientWithCredentials() {
    const accessToken = useAccessTokenStore().getPrincipal()

    return axios.create({
        baseURL: BASE_URL,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        },
        withCredentials: true
    })
}

export {
    APIClient,
    APIClientWithCredentials
}