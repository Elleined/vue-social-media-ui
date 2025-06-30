import {FileAPIClient} from "@/api/file.client.ts";

export const fileClientService = {

    async delete(folder: string, file: string): Promise<void> {
        if (!folder) {
            throw new Error("please provide folder");
        }

        if (!file) {
            throw new Error("please provide file");
        }

        const response = await FileAPIClient().delete(`/folders/${folder}/files/${file}`);
        return response.data;
    },

    async upload(folder: string, file: File): Promise<string> {
        if (!folder) {
            throw new Error("please provide folder");
        }

        if (!file) {
            throw new Error("please provide file");
        }

        const formData = new FormData();
        formData.append('file', file);

        const response = await FileAPIClient().post(`/folders/${folder}/files`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        });

        return response.data;
    },

    async read(folder: string, file: string) {
        if (!file)
            return

        if (!folder) {
            throw new Error("please provide folder");
        }

        const response = await FileAPIClient().get(`/folders/${folder}/files/${file}`, {
            responseType: "blob",
        });

        return response.data;
    }
}