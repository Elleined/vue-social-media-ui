import axios from "axios";
import {type ToastServiceMethods} from "primevue";

export function handleAxiosError(toast: ToastServiceMethods, error: any) {
    if (!axios.isAxiosError(error))
        return

    const errorData = error.response?.data
    if (!Array.isArray(errorData)) {
        toast.add({ severity: 'error', summary: 'Error Message', detail: `${errorData?.message}`, life: 1500 });
    } else {
        for (const errorMessage of errorData) {
            toast.add({ severity: 'error', summary: 'Error Message', detail: `${errorMessage.message}`, life: 1500 });
        }
    }
}