import axios, {type AxiosInstance} from "axios";
import {useAccessTokenStore} from "@/stores/AccessTokenStore.ts";
import {refreshService} from "@/services/RefreshService.ts";
import {useCurrentUserStore} from "@/stores/CurrentUserStore.ts";
import type User from "@/models/User.ts";
import {userService} from "@/services/UserService.ts";

export const BASE_URL: string = `http://${import.meta.env.VITE_BACKEND_HOST}:${import.meta.env.VITE_BACKEND_PORT}`

let isRefreshing = false;
let failedQueue: { resolve: (value: any) => void; reject: (reason?: any) => void }[] = [];

function processQueue(error: any, token: string | null = null) {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });
    failedQueue = [];
}

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
    const accessTokenStore = useAccessTokenStore();
    const currentUserStore = useCurrentUserStore()

    const client: AxiosInstance = axios.create({
        baseURL: BASE_URL,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessTokenStore.get()}`
        },
        withCredentials: true
    });

    client.interceptors.request.use(
        (config) => {
            const token = accessTokenStore.get();
            if (token) {
                config.headers['Authorization'] = `Bearer ${token}`;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );


    client.interceptors.response.use(response => response, async error => {
            const originalRequest = error.config;

            if (error.response?.status === 401 && !originalRequest._retry) {
                if (isRefreshing) {
                    return new Promise((resolve, reject) => {
                        failedQueue.push({ resolve, reject });
                    })
                        .then(token => {
                            originalRequest.headers['Authorization'] = `Bearer ${token}`;
                            return client(originalRequest);
                        })
                        .catch(err => {
                            return Promise.reject(err);
                        });
                }

                originalRequest._retry = true;
                isRefreshing = true;

                try {
                    const accessToken = await refreshService.refreshToken()
                    const currentUser: User = await userService.getByJWT(accessToken)
                    accessTokenStore.set(accessToken);
                    currentUserStore.set(currentUser);

                    client.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`; // Update default header for future requests
                    originalRequest.headers['Authorization'] = `Bearer ${accessToken}`; // Update the original request's header

                    processQueue(null, accessToken);
                    return client(originalRequest); // Retry the original request
                } catch (e: any) {
                    accessTokenStore.clear()
                    currentUserStore.clear()
                    processQueue(e);
                    window.location.href = "/login"
                    return Promise.reject(error); // Reject the promise so the calling function knows it failed
                } finally {
                    isRefreshing = false;
                }
            }

            return Promise.reject(error);
        }
    );

    return client;
}

