import type {Emoji} from "@/models/Emoji.ts";
import {APIClientWithCredentials} from "@/utilities/APIClient.ts";

export const emojiService = {
    async save(name: string): Promise<number> {
        if (!name)
            throw new Error("please provide name")

        const response = await APIClientWithCredentials().post("/emojis", null, {
            params: {
                name: name,
            }
        })

        return response.data
    },

    async getAll(): Promise<Emoji[]> {
        const response = await APIClientWithCredentials().get("/emojis")
        return response.data
    },

    async updateName(id: number, name: string): Promise<string> {
        if (!id || id < 0)
            throw new Error("please provide id")

        if (!name)
            throw new Error("please provide name")

        const response = await APIClientWithCredentials().patch(`/emojis/${id}`, null, {
            params: {
                name: name,
            }
        })

        return response.data
    },

    async deleteById(id: number): Promise<void> {
        if (!id || id < 0)
            throw new Error("please provide id")

        const response = await APIClientWithCredentials().delete(`/emojis/${id}`)
        return response.data
    },

    async getById(id: number): Promise<Emoji> {
        if (!id || id < 0)
            throw new Error("please provide id")

        const response = await APIClientWithCredentials().get(`/emojis/${id}`)
        return response.data
    },
}