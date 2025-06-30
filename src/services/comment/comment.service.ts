import {ApiClient} from "@/api/api-client.ts";
import type {CommentReaction, Page} from "@/types/model.d.ts";

export const commentService = {
    async save(postId: number, content: string, attachment: string): Promise<number> {
        if (!postId || postId < 0)
            throw new Error("please provide post id")

        if (!content)
            throw new Error("please provide content")

        const response = await ApiClient().post(`/users/posts/${postId}/comments`, {
            content: content,
            attachment: attachment
        })

        return response.data
    },

    async getAll(postId: number,
                 page: number,
                 size: number,
                 field: string,
                 sortBy: 'asc' | 'desc',
                 isDeleted: boolean): Promise<Page<CommentReaction>> {

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

        const response = await ApiClient().get(`/users/posts/${postId}/comments`, {
            params: {
                page: page,
                pageSize: size,
                field: field,
                sortBy: sortBy,
                isDeleted: isDeleted
            }
        })

        return response.data
    },

    async updateContent(postId: number, commentId: number, content: string): Promise<string> {
        if (!postId || postId < 0)
            throw new Error("please provide post id")

        if (!commentId || commentId < 0)
            throw new Error("please provide comment id")

        if (!content)
            throw new Error("please provide content")

        const response = await ApiClient().patch(`/users/posts/${postId}/comments/${commentId}/content`, null, {
            params: {
                content: content
            }
        })

        return response.data
    },

    async updateAttachment(postId: number, commentId: number, attachment: string): Promise<string> {
        if (!postId || postId < 0)
            throw new Error("please provide post id")

        if (!commentId || commentId < 0)
            throw new Error("please provide comment id")

        if (!attachment)
            throw new Error("please provide attachment")

        const response = await ApiClient().patch(`/users/posts/${postId}/comments/${commentId}/attachment`, null, {
            params: {
                attachment: attachment
            }
        })

        return response.data
    },

    async deleteById(postId: number, commentId: number): Promise<void> {
        if (!postId || postId < 0)
            throw new Error("please provide post id")

        if (!commentId || commentId < 0)
            throw new Error("please provide comment id")

        const response = await ApiClient().delete(`/users/posts/${postId}/comments/${commentId}`)
        return response.data
    },

    async getById(postId: number, commentId: number): Promise<CommentReaction> {
        if (!postId || postId < 0)
            throw new Error("please provide post id")

        if (!commentId || commentId < 0)
            throw new Error("please provide comment id")

        const response = await ApiClient().delete(`/users/posts/${postId}/comments/${commentId}`)
        return response.data
    },
}