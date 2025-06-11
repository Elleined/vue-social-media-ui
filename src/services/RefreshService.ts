import {APIClient, APIClientWithCredentials} from "@/utilities/APIClient.ts";
import type {Refresh} from "@/models/Refresh.ts";

export const refreshService = {
    async refreshToken() {
        const response = await APIClient().post("/users/refresh-tokens")
        return response.data
    },

    async getAll(): Promise<Refresh> {
        const response = await APIClientWithCredentials().get("/users/refresh-tokens")
        return response.data
    },

    async revoke(id: number) {
        if (!id || id < 0)
            throw new Error("please provide refresh token id")

        const response = await APIClientWithCredentials().delete(`/users/refresh-tokens/${id}`)
        return response.data
    }
}
