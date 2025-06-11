import axios from "axios";
import {type ToastServiceMethods} from "primevue";


export default function handleError(toast: ToastServiceMethods, error: any) {
    if (!axios.isAxiosError(error)) {
        toast.add({ severity: 'error', summary: 'Error Message', detail: `${error.message}`, life: 1500 });
        return
    }

    handleAxiosError(toast, error)
}

function handleAxiosError(toast: ToastServiceMethods, error: any) {
    const errorData = error.response?.data
    if (!Array.isArray(errorData)) {
        toast.add({ severity: 'error', summary: 'Error Message', detail: `${errorData?.message}`, life: 1500 });
    } else {
        for (const errorMessage of errorData) {
            toast.add({ severity: 'error', summary: 'Error Message', detail: `${errorMessage.message}`, life: 1500 });
        }
    }
}
