import {APIClient} from "@/utilities/APIClient.ts";
import type {Refresh} from "@/types/model.d.ts";


export const refreshService = {
    async refreshToken() {
        const response = await APIClient().post("/users/refresh-tokens")
        return response.data
    },

    async getAll(): Promise<Refresh> {
        const response = await APIClient().get("/users/refresh-tokens")
        return response.data
    },

    async revoke(id: number) {
        if (!id || id < 0)
            throw new Error("please provide refresh token id")

        const response = await APIClient().delete(`/users/refresh-tokens/${id}`)
        return response.data
    }
}
