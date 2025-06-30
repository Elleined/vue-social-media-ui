import axios, {type AxiosInstance} from "axios";

export function FileAPIClient(): AxiosInstance {
    return axios.create({
        baseURL: `http://${import.meta.env.VITE_FILE_SERVER_HOST}:${import.meta.env.VITE_FILE_SERVER_PORT}`
    })
}