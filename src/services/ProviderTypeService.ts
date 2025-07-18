import {APIClient} from "@/utilities/APIClient.ts";
import type {ProviderType} from "@/models/models.ts";


export const providerTypeService = {
    async save(name: string): Promise<number> {
        if (!name)
            throw new Error("please provide name")

        const response = await APIClient().post("/provider-types", null, {
            params: {
                name: name
            }
        })

        return response.data
    },

    async getById(id: number): Promise<ProviderType> {
        if (!id || id < 0)
            throw new Error("please provide refresh token id")

        const response = await APIClient().get(`/provider-types/${id}`)
        return response.data
    },

    async deleteById(id: number): Promise<void> {
        if (!id || id < 0)
            throw new Error("please provide refresh token id")

        const response = await APIClient().delete(`/provider-types/${id}`)
        return response.data
    },

    async getAll(): Promise<ProviderType[]> {
        const response = await APIClient().get(`/provider-types`)
        return response.data
    },

    async updateName(id: number, name: string): Promise<string> {
        if (!id || id < 0)
            throw new Error("please provide refresh token id")

        if (!name)
            throw new Error("please provide name")

        const response = await APIClient().patch(`/provider-types/${id}`, null, {
            params: {
                name: name,
            }
        })

        return response.data
    },
}