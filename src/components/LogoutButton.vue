<script setup lang="ts">
import {useAccessTokenStore} from "@/stores/AccessTokenStore.ts";
import {useRouter} from "vue-router";
import handleError from "@/utilities/AxiosErrorHandler.ts";
import {useToast} from "primevue";
import {userService} from "@/services/UserService.ts";
import {useCurrentUserStore} from "@/stores/CurrentUserStore.ts";

const toast = useToast()
const router = useRouter()
const accessTokenStore = useAccessTokenStore()
const currentUserStore = useCurrentUserStore()

async function logout() {
  try {
    await userService.logout()

    accessTokenStore.clear()
    currentUserStore.clear()
    await router.push('/login')
  } catch (e) {
    handleError(toast, e)
  }
}
</script>

<template>
  <Button icon="pi pi-sign-out" severity="danger" variant="text" rounded aria-label="Logout" @click="logout()" />
  <Toast />
</template>

<style scoped>

</style>