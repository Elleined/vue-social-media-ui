import {APIClient} from "@/utilities/APIClient.ts";
import type {Page, PostReaction} from "@/models/models.ts";

export const postReactionService = {

    async save(postId: number, emojiId: number): Promise<number> {
        if (!postId || postId < 0)
            throw new Error("please provide post id")

        if (!emojiId || emojiId < 0)
            throw new Error("please provide emoji id")

        const response = await APIClient().post(`users/posts/${postId}/reactions`, null, {
            params: {
                emojiId: emojiId,
            }
        })

        return response.data
    },

    async getById(postId: number, reactionId: number): Promise<PostReaction> {
        if (!postId || postId < 0)
            throw new Error("please provide post id")

        if (!reactionId || reactionId < 0)
            throw new Error("please provide reaction id")

        const response = await APIClient().get(`users/posts/${postId}/reactions/${reactionId}`)
        return response.data
    },

    async getAll(postId: number,
                 page: number,
                 size: number,
                 field: string,
                 sortBy: 'asc' | 'desc'): Promise<Page<PostReaction>> {

        if (!postId || postId < 0)
            throw new Error("please provide post id")

        if (!page || page < 0)
            throw new Error("please provide page number")

        if (!size || size < 0)
            throw new Error("please provide page size")

        if (!field)
            throw new Error("please provide field")

        if (!sortBy)
            throw new Error("please provide sort by")

        const response = await APIClient().get(`/users/posts/${postId}/reactions`, {
            params: {
                page: page,
                pageSize: size,
                field: field,
                sortBy: sortBy
            }
        })

        return response.data
    },

    async getAllByEmoji(postId: number,
                        emojiId: number,
                        page: number,
                        size: number,
                        field: string,
                        sortBy: 'asc' | 'desc'): Promise<Page<PostReaction>> {

        if (!postId || postId < 0)
            throw new Error("please provide post id")

        if (!emojiId || emojiId < 0)
            throw new Error("please provide emoji id")

        if (!page || page < 0)
            throw new Error("please provide page number")

        if (!size || size < 0)
            throw new Error("please provide page size")

        if (!field)
            throw new Error("please provide field")

        if (!sortBy)
            throw new Error("please provide sort by")

        const response = await APIClient().get(`/users/posts/${postId}/reactions/emoji/${emojiId}`, {
            params: {
                page: page,
                pageSize: size,
                field: field,
                sortBy: sortBy
            }
        })

        return response.data
    },

    async update(postId: number, emojiId: number): Promise<number> {
        if (!postId || postId < 0)
            throw new Error("please provide post id")

        if (!emojiId || emojiId < 0)
            throw new Error("please provide emoji id")

        const response = await APIClient().patch(`users/posts/${postId}/reactions/emoji/${emojiId}`)
        return response.data
    },

    async deleteById(postId: number): Promise<void> {
        if (!postId || postId < 0)
            throw new Error("please provide post id")

        const response = await APIClient().delete(`users/posts/${postId}/reactions`)
        return response.data
    },
}