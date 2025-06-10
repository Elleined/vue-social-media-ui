import type Page from "@/models/paging/Page.ts";
import type Post from "@/models/Post.ts";
import {APIClientWithCredentials} from "@/utilities/APIClient.ts";

export const postService = {
    async save(content: string, attachment: string | undefined): Promise<number> {
        if (!content)
            throw new Error("please provide content");

        const response = await APIClientWithCredentials().post("/users/posts", {
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

        const response = await APIClientWithCredentials().get("/users/posts", {
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

        const response = await APIClientWithCredentials().get("/users/posts/all-by-user", {
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

        const response = await APIClientWithCredentials().patch(`/users/posts/${postId}/content}`, null, {
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

        const response = await APIClientWithCredentials().patch(`/users/posts/${postId}/attachment}`, null, {
            params: {
                attachment: attachment
            }
        })

        return response.data
    },

    async delete(postId: number): Promise<void> {
        if (!postId || postId < 0)
            throw new Error("please provide post")

        const response = await APIClientWithCredentials().delete(`/users/posts/${postId}`)
        return response.data
    },

    async getById(postId: number): Promise<Post> {
        if (!postId || postId < 0)
            throw new Error("please provide post")

        const response = await APIClientWithCredentials().get(`/users/posts/${postId}`)
        return response.data
    }
}