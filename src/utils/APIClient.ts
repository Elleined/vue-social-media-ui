import axios from "axios";
import {useAccessTokenStore} from "@/stores/AccessTokenStore.ts";

function APIClient() {
    return axios.create({
        baseURL: 'http://localhost:8000',
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

function APIClientWithCredentials() {
    const accessToken = useAccessTokenStore().getPrincipal()

    return axios.create({
        baseURL: 'http://localhost:8000',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        },
        withCredentials: true
    });
}

export {
    APIClient,
    APIClientWithCredentials
}