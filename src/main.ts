import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import ToastService from 'primevue/toastservice';
import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';
import {Button} from "primevue";

const app = createApp(App)

app.use(PrimeVue, {
    theme: {
        preset: Aura
    }
});

app.use(createPinia())
app.use(router)
app.use(ToastService)

app.component("Button", Button)

app.mount('#app')
