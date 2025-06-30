import {ApiClient} from "@/api/api.client.ts";
import type {RegisterRequest} from "@/types/request/register.request.ts";
import type {User} from "@/types/models/user/user.model.ts";
import type {Page} from "@/types/models/page/page.model.ts";
import type {LoginRequest} from "@/types/request/login.request.ts";

export const userService = {
    async save(request: RegisterRequest): Promise<number> {
        if (!request.firstName)
            throw new Error("please provide first name")

        if (!request.lastName)
            throw new Error("please provide last name")

        if (!request.username)
            throw new Error("please provide email")

        if (!request.password)
            throw new Error("please provide password")

        const response = await ApiClient().post("/users", {
            first_name: request.firstName,
            last_name: request.lastName,
            email: request.username,
            password: request.password,
            attachment: request.attachment,
        })

        return response.data;
    },

    async getById(id: number): Promise<User> {
        if (!id || id < 0)
            throw new Error("please provide user")

        const response = await ApiClient().get(`/users/id/${id}`)
        return response.data
    },

    async getByEmail(email: string): Promise<User> {
        if (!email)
            throw new Error("please provide email")

        const response = await ApiClient().get(`/users/email/${email}`)
        return response.data
    },

    async getAll(page: number,
                 size: number,
                 field: string,
                 sortBy: 'asc' | 'desc',
                 isActive: boolean): Promise<Page<User>> {

        if (!page || page < 0)
            throw new Error("please provide page number")

        if (!size || size < 0)
            throw new Error("please provide page size")

        if (!field)
            throw new Error("please provide field")

        if (!sortBy)
            throw new Error("please provide sort by")

        const response = await ApiClient().get("/users", {
            params: {
                page: page,
                pageSize: size,
                field: field,
                sortBy: sortBy,
                isActive: isActive,
            }
        })

        return response.data
    },

    async getAllWithDefault(): Promise<Page<User>> {
        return await this.getAll(1, 10, "created_at", "desc", true)
    },

    async updateAttachment(userId: number, attachment: string): Promise<string> {
        if (!userId || userId < 0)
            throw new Error("please provide user")

        if (!attachment)
            throw new Error("please provide attachment")

        const response = await ApiClient().patch(`/users/${userId}/attachment`, null, {
            params: {
                attachment: attachment
            }
        })

        return response.data
    },

    async updateStatus(userId: number, status: boolean): Promise<boolean> {
        if (!userId || userId < 0)
            throw new Error("please provide user")

        const response = await ApiClient().patch(`/users/${userId}/status`, null, {
            params: {
                status: status
            }
        })

        return response.data
    },

    async updatePassword(userId: number, password: string): Promise<boolean> {
        if (!userId || userId < 0)
            throw new Error("please provide user")

        if (!password)
            throw new Error("please provide password")

        const response = await ApiClient().patch(`/users/${userId}/password`, {
            password: password
        })

        return response.data
    },

    async deleteById(userId: number): Promise<void> {
        if (!userId || userId < 0)
            throw new Error("please provide user")

        const response = await ApiClient().delete(`/users/${userId}`)
        return response.data
    },

    async login(request: LoginRequest): Promise<string> {
        if (!request.username)
            throw new Error("please provide username")

        if (!request.password)
            throw new Error("please provide password")

        const response = await ApiClient().post('/users/login', {
            username: request.username,
            password: request.password
        })

        return response.data;
    },

    async logout(): Promise<void> {
        const response = await ApiClient().post("/users/logout")
        return response.data
    }
}