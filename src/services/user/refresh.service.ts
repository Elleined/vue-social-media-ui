import {ApiClient} from "@/api/api.client.ts";
import type {Refresh} from "@/types/models/user/refresh.model.ts";


export const refreshService = {
    async refreshToken() {
        const response = await ApiClient().post("/users/refresh-tokens")
        return response.data
    },

    async getAll(): Promise<Refresh> {
        const response = await ApiClient().get("/users/refresh-tokens")
        return response.data
    },

    async revoke(id: number) {
        if (!id || id < 0)
            throw new Error("please provide refresh token id")

        const response = await ApiClient().delete(`/users/refresh-tokens/${id}`)
        return response.data
    }
}
