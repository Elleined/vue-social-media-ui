import axios from "axios";
import {type ToastServiceMethods} from "primevue";


export default function handleError(toast: ToastServiceMethods, error: any) {
    if (!axios.isAxiosError(error)) {
        handleLocalError(toast, error)
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

function handleLocalError(toast: ToastServiceMethods, error: any) {
    console.log("Local error")
    console.log(error)
}