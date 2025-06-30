import {ApiClient} from "@/api/api.client.ts";
import type {Page} from "@/types/models/page/page.interface.ts";
import type {Post} from "@/types/models/post/post.interface.ts";

export const postService = {
    async save(content: string, attachment?: string): Promise<number> {
        if (!content)
            throw new Error("please provide content");

        const response = await ApiClient().post("/users/posts", {
            content: content,
            attachment: attachment
        })

        return response.data
    },

    async getAll(page: number,
                 size: number,
                 field: string,
                 sortBy: 'asc' | 'desc',
                 isDeleted: boolean): Promise<Page<Post>> {

        if (!page || page < 0)
            throw new Error("please provide page number")

        if (!size || size < 0)
            throw new Error("please provide page size")

        if (!field)
            throw new Error("please provide field")

        if (!sortBy)
            throw new Error("please provide sort by")

        const response = await ApiClient().get("/users/posts", {
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

    async getAllWithDefault(): Promise<Page<Post>> {
        return await this.getAll(1, 10, "created_at", "desc", false)
    },

    async getAllByAuthor(page: number,
                         size: number,
                         field: string,
                         sortBy: 'asc' | 'desc',
                         isDeleted: boolean): Promise<Page<Post>> {

        if (!page || page < 0)
            throw new Error("please provide page number")

        if (!size || size < 0)
            throw new Error("please provide page size")

        if (!field)
            throw new Error("please provide field")

        if (!sortBy)
            throw new Error("please provide sort by")

        const response = await ApiClient().get("/users/posts/all-by-user", {
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