import {FileAPIClient} from "@/api/file.client.ts";
import type {FileUploadRequest} from "@/types/request/file-upload.request.ts";

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

    async upload(request: FileUploadRequest): Promise<string> {
        if (!request.folder) {
            throw new Error("please provide folder");
        }

        if (!request.attachment) {
            throw new Error("please provide attachment");
        }

        const formData = new FormData();
        formData.append('file', request.attachment);

        const response = await FileAPIClient().post(`/folders/${request.folder}/files`, formData, {
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