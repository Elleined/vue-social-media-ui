import axios from "axios";

export function handleError(error: any) {
    if (axios.isAxiosError(error)) {

    } else {

    }
    console.log(error)
}