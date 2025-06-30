import {APIClient} from "@/utilities/APIClient.ts";
import type {Page, User} from "@/models/models.ts";


export const userService = {
    async save(
        firstName: string,
        lastName: string,
        email: string,
        password: string,
        attachment?: string,
    ): Promise<number> {

        if (!firstName)
            throw new Error("please provide first name")

        if (!lastName)
            throw new Error("please provide last name")

        if (!email)
            throw new Error("please provide email")

        if (!password)
            throw new Error("please provide password")

        const response = await APIClient().post("/users", {
            first_name: firstName,
            last_name: lastName,
            email: email,
            password: password,
            attachment: attachment
        })

        return response.data
    },

    async getByJWT(jwt: string): Promise<User> {
        const response = await APIClient().get(`/users/jwt`, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        })

        return response.data
    },

    async getById(id: number): Promise<User> {
        if (!id || id < 0)
            throw new Error("please provide user")

        const response = await APIClient().get(`/users/id/${id}`)
        return response.data
    },

    async getByEmail(email: string): Promise<User> {
        if (!email)
            throw new Error("please provide email")

        const response = await APIClient().get(`/users/email/${email}`)
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

        const response = await APIClient().get("/users", {
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

        const response = await APIClient().patch(`/users/${userId}/attachment`, null, {
            params: {
                attachment: attachment
            }
        })

        return response.data
    },

    async updateStatus(userId: number, status: boolean): Promise<boolean> {
        if (!userId || userId < 0)
            throw new Error("please provide user")

        const response = await APIClient().patch(`/users/${userId}/status`, null, {
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

        const response = await APIClient().patch(`/users/${userId}/password`, {
            password: password
        })

        return response.data
    },

    async deleteById(userId: number): Promise<void> {
        if (!userId || userId < 0)
            throw new Error("please provide user")

        const response = await APIClient().delete(`/users/${userId}`)
        return response.data
    },

    async login(
        username: string,
        password: string,
    ): Promise<string> {

        if (!username)
            throw new Error("please provide username")

        if (!password)
            throw new Error("please provide password")

        return await APIClient().post('/users/login', {
            username: username,
            password: password
        })
    },

    async logout(): Promise<void> {
        const response = await APIClient().post("/users/logout")
        return response.data
    }
}