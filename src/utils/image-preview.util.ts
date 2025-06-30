import type {Ref} from "vue";

export const imageUtil = {
    previewAttachment(event: any, attachment: Ref, preview: Ref) {
        attachment.value = event.files[0]
        const reader = new FileReader()

        reader.onload = () => {
            if (reader.result) {
                preview.value = reader.result
            }
        }

        reader.readAsDataURL(attachment.value)
    }
}
