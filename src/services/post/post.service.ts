import {ApiClient} from "@/api/api.client.ts";
import type {Page} from "@/types/models/page/page.model.ts";
import type {Post} from "@/types/models/post/post.model.ts";
import type {PostRequest} from "@/types/request/post.request.ts";
import type {PageRequest} from "@/types/request/page.request.ts";

export const postService = {
    async save(request: PostRequest): Promise<number> {
        if (!request.content)
            throw new Error("please provide content");

        const response = await ApiClient().post("/users/posts", {
            content: request.content,
            attachment: request.attachment
        })

        return response.data
    },

    async getAll(request: PageRequest): Promise<Page<Post>> {
        if (!request.page || request.page < 0)
            throw new Error("please provide page number")

        if (!request.size || request.size < 0)
            throw new Error("please provide page size")

        if (!request.field)
            throw new Error("please provide field")

        if (!request.sortBy)
            throw new Error("please provide sort by")

        const response = await ApiClient().get("/users/posts", {
            params: {
                page: request.page,
                pageSize: request.size,
                field: request.field,
                sortBy: request.sortBy,
                isDeleted: request.isDeleted
            }
        })

        return response.data
    },

    async getAllByAuthor(request: PageRequest): Promise<Page<Post>> {
        if (!request.page || request.page < 0)
            throw new Error("please provide page number")

        if (!request.size || request.size < 0)
            throw new Error("please provide page size")

        if (!request.field)
            throw new Error("please provide field")

        if (!request.sortBy)
            throw new Error("please provide sort by")

        const response = await ApiClient().get("/users/posts/all-by-user", {
            params: {
                page: request.page,
                pageSize: request.size,
                field: request.field,
                sortBy: request.sortBy,
                isDeleted: request.isDeleted
            }
        })

        return response.data
    },

    async updateContent(postId: number, content: string): Promise<string> {
        if (!postId || postId < 0)
            throw new Error("please provide post")

        if (!content)
            throw new Error("please provide content")

        const response = await ApiClient().patch(`/users/posts/${postId}/content}`, null, {
            params: {
                content: content
            }
        })

        return response.data
    },

    async updateAttachment(postId: number, attachment: string): Promise<string> {
        if (!postId || postId < 0)
            throw new Error("please provide post")

        if (!attachment)
            throw new Error("please provide attachment")

        const response = await ApiClient().patch(`/users/posts/${postId}/attachment}`, null, {
            params: {
                attachment: attachment
            }
        })

        return response.data
    },

    async deleteById(postId: number): Promise<void> {
        if (!postId || postId < 0)
            throw new Error("please provide post")

        const response = await ApiClient().delete(`/users/posts/${postId}`)
        return response.data
    },

    async getById(postId: number): Promise<Post> {
        if (!postId || postId < 0)
            throw new Error("please provide post")

        const response = await ApiClient().get(`/users/posts/${postId}`)
        return response.data
    }
}