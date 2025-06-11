import type {CommentReaction} from "@/models/CommentReaction.ts";
import type Page from "@/models/paging/Page.ts";
import {APIClientWithCredentials} from "@/utilities/APIClient.ts";

export const commentReactionService = {
    async save(postId: number, commentId: number, emojiId: number) {
        if (!postId || postId < 0)
            throw new Error("please provide post id");

        if (!commentId || commentId < 0)
            throw new Error("please provide comment id");

        if (!emojiId || emojiId < 0)
            throw new Error("please provide emoji id");

        const response = await APIClientWithCredentials().post(`/users/posts/${postId}/comments/${commentId}/reactions`, null, {
            params: {
                emojiId: emojiId,
            }
        });

        return response.data;
    },

    async getAll(postId: number,
                 commentId: number,
                 page: number,
                 size: number,
                 field: string,
                 sortBy: 'asc' | 'desc') {

        if (!postId || postId < 0)
            throw new Error("please provide post id");

        if (!commentId || commentId < 0)
            throw new Error("please provide comment id");

        if (!page || page < 0)
            throw new Error("please provide page number")

        if (!size || size < 0)
            throw new Error("please provide page size")

        if (!field)
            throw new Error("please provide field")

        if (!sortBy)
            throw new Error("please provide sort by")

        const response = await APIClientWithCredentials().get(`/users/posts/${postId}/comments/${commentId}/reactions`, {
            params: {
                page: page,
                pageSize: size,
                field: field,
                sortBy: sortBy
            }
        })

        return response.data;
    },

    async getAllByEmoji(postId: number,
                        commentId: number,
                        emojiId: number,
                        page: number,
                        size: number,
                        field: string,
                        sortBy: 'asc' | 'desc'): Promise<Page<CommentReaction>> {

        if (!postId || postId < 0)
            throw new Error("please provide post id");

        if (!commentId || commentId < 0)
            throw new Error("please provide comment id");

        if (!emojiId || emojiId < 0)
            throw new Error("please provide emoji id");

        if (!page || page < 0)
            throw new Error("please provide page number")

        if (!size || size < 0)
            throw new Error("please provide page size")

        if (!field)
            throw new Error("please provide field")

        if (!sortBy)
            throw new Error("please provide sort by")

        const response = await APIClientWithCredentials().get(`/users/posts/${postId}/comments/${commentId}/reactions/emoji/${emojiId}`, {
            params: {
                page: page,
                pageSize: size,
                field: field,
                sortBy: sortBy
            }
        })

        return response.data;
    },

    async update(postId: number, commentId: number, emojiId: number) {
        if (!postId || postId < 0)
            throw new Error("please provide post id");

        if (!commentId || commentId < 0)
            throw new Error("please provide comment id");

        if (!emojiId || emojiId < 0)
            throw new Error("please provide emoji id");

        const response = await APIClientWithCredentials().patch(`/users/posts/${postId}/comments/${commentId}/reactions/emoji/${emojiId}`)
        return response.data;
    },

    async deleteById(postId: number, commentId: number) {
        if (!postId || postId < 0)
            throw new Error("please provide post id");

        if (!commentId || commentId < 0)
            throw new Error("please provide comment id");

        const response = await APIClientWithCredentials().delete(`/users/posts/${postId}/comments/${commentId}/reactions`)
        return response.data;
    },

    async getById(postId: number, commentId: number, reactionId: number) {
        if (!postId || postId < 0)
            throw new Error("please provide post id");

        if (!commentId || commentId < 0)
            throw new Error("please provide comment id");

        const response = await APIClientWithCredentials().get(`/users/posts/${postId}/comments/${commentId}/reactions/${reactionId}`)
        return response.data;
    },
}