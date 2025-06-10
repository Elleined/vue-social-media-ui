import './assets/main.css'

import {createApp} from 'vue'
import {createPinia} from 'pinia'

import App from './App.vue'
import router from './router'
import ToastService from 'primevue/toastservice';
import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';
import {
    Avatar,
    AvatarGroup,
    Button,
    Card,
    ColorPicker,
    DatePicker,
    Dialog, FileUpload,
    FloatLabel,
    IftaLabel,
    Image,
    InputGroup,
    InputGroupAddon,
    InputText,
    Menu,
    Message,
    Password,
    Popover,
    Textarea,
    Toast
} from "primevue";
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const app = createApp(App)

app.use(PrimeVue, {
    theme: {
        preset: Aura
    }
});

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

app.use(pinia)
app.use(router)
app.use(ToastService)

app.component("Card", Card)
app.component("Button", Button)
app.component("Dialog", Dialog)
app.component("AvatarGroup", AvatarGroup)
app.component("Avatar", Avatar)
app.component("Message", Message)
app.component("InputGroup", InputGroup)
app.component("InputGroupAddon", InputGroupAddon)
app.component("InputText", InputText)
app.component("DatePicker", DatePicker)
app.component("ColorPicker", ColorPicker)
app.component("IftaLabel", IftaLabel)
app.component("FloatLabel", FloatLabel)
app.component("TextArea", Textarea)
app.component("Toast", Toast)
app.component("Password", Password)
app.component("Popover", Popover)
app.component("Menu", Menu)
app.component("Image", Image)
app.component("FileUpload", FileUpload)

app.mount('#app')
