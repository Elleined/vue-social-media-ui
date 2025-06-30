export interface LoginRequest {
    username: string;
    password: string;
}

export interface RegisterRequest {
    firstName: string;
    lastName: string;
    username: string;
    password: string;
    attachment?: string;
}

interface FileUploadRequest {
    folder: string;
    attachment: any
}